import FormProvider, { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import RHFImageDropzone from '@common/components/lib/react-hook-form/RHFImageDropzone';
import RHFPhoneField from '@common/components/lib/react-hook-form/RHFPhoneField';
import Routes from '@common/defs/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import useLocations from '@modules/locations/hooks/api/useLocations';
import { ROLES_OPTIONS } from '@modules/permissions/defs/options';
import { ROLE } from '@modules/permissions/defs/types';
import { Provider } from '@modules/providers/defs/types';
import useProviders from '@modules/providers/hooks/api/useProviders';
import useUploads from '@modules/uploads/hooks/api/useUploads';
import { User } from '@modules/users/defs/types';
import useUsers, { UpdateOneInput } from '@modules/users/hooks/api/useUsers';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface UpdateProviderFormProps {
  item: Provider;
}

const UpdateProviderForm = (props: UpdateProviderFormProps) => {
  const { item } = props;
  const router = useRouter();
  const { updateOne: updateOneUpload } = useUploads();
  const { updateOne: updateOneLocation } = useLocations();
  const { updateOne: updateOneUser } = useUsers();
  const { updateOne: updateOneProvider } = useProviders();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Le format de l'email est incorrect")
      .required('Le champ est obligatoire'),
    password: Yup.string(),
    phone: Yup.string().required('Le champ est obligatoire'),
    firstname: Yup.string().required('Le champ est obligatoire'),
    avatar: Yup.mixed().test('fileType', 'Format de fichier non valide', (value) => {
      if (!value) {
        return true; // No file provided, so no validation needed
      }
      const file = value as File;
      const acceptedFormats = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/svg',
        'image/webp',
      ]; // Add more formats as needed
      return acceptedFormats.includes(file.type);
    }),
    lastname: Yup.string().required('Le champ est obligatoire'),
    description: Yup.string(),
    state: Yup.string(),
    address: Yup.string().required('Le champ est obligatoire'),
    city: Yup.string().required('Le champ est obligatoire'),
    country: Yup.string().required('Le champ est obligatoire'),
    postalCode: Yup.string(),
    availabilitySchedule: Yup.string(),
    hourlyRate: Yup.number(),

  });
  const methods = useForm<UpdateOneInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: item.user.email || '',
      password: item.user.password || '',
      firstname: item.user.firstname || '',
      lastname: item.user.lastname || '',
      phone: item.user.phone || '',
      role: ROLE.PROVIDER,
      avatarId: item.user.avatarId || 0,
      locationId: item.user.locationId || 0,
      address: item.user.location?.address || '',
      city: item.user.location?.city || '',
      country: item.user.location?.country || '',
      latitude: item.user.location?.latitude || undefined,
      longitude: item.user.location?.longitude || undefined,
      postalCode: item.user.location?.postalCode || '',
      state: item.user.location?.state || '',
      description: item.description || '',
      availabilitySchedule: item.availabilitySchedule || '',
      hourlyRate: item.hourlyRate || 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: UpdateOneInput) => {
    const dataUpload = { file: data.avatar };
    if (data.avatar) {
      const uploadResponse = await updateOneUpload(data.avatarId, dataUpload);
      if (uploadResponse.data) {
        data.avatarId = uploadResponse.data?.item.id;
      }
    }
    let dataLocation;
    dataLocation = { address: data.address }
    dataLocation = { ...dataLocation, city: data.city }
    dataLocation = { ...dataLocation, country: data.country }
    if (data.postalCode) {
      dataLocation = { ...dataLocation, postalCode: data.postalCode }
    }
    if (data.state) {
      dataLocation = { ...dataLocation, state: data.state }
    }
    const locationResponse = await updateOneLocation(data.locationId, dataLocation);
    if (locationResponse.data) {
      data.locationId = locationResponse.data?.item.id;
    }
    const response = await updateOneUser(item.userId, data);
    if (response.data) {
      await updateOneProvider(item.id, { userId: response.data?.item.id, description: data.description, hourlyRate: data.hourlyRate, availabilitySchedule: data.availabilitySchedule }, {
        displayProgress: true,
        displaySuccess: true,
      });
    }
    router.push(Routes.Providers.ReadAll);
  };
  return (
    <>
      <Card sx={{ maxWidth: '800px', margin: 'auto' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} columnSpacing={2} sx={{ padding: 5 }}>
            <Grid item md={4} sm={12} gap={3} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    borderWidth: 2,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}
                >
                  {item.user.avatar && (
                    <Box
                      component="img"
                      sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                        position: 'inherit !important',
                      }}
                      alt="avatar."
                      src={process.env.NEXT_PUBLIC_API_URL + item.user.avatar.path}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item md={8} sm={12}>
              <RHFImageDropzone name="avatar" label="Choisir un nouvel avatar" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="firstname" label={'firstname'} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="lastname" label={'lastname'} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFPhoneField name="phone" label={'phone'} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="country" label={'country'} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="state" label={'state'} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="city" label={'city'} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="postalCode" label={'postalCode'} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="email" label={"email"} type="email" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="password" label={"password"} type="password" />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField name="address" label={"address"} minRows={2} maxRows={3} multiline />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField name="description" label={"description"} minRows={2} maxRows={3} multiline />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="hourlyRate" label={"hourlyRate"} type='number' />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="availabilitySchedule" label={"availabilitySchedule"} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                startIcon={<LockOpen />}
                loadingPosition="start"
                loading={isSubmitting}
              >
                Modifier
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </>
  );
};

export default UpdateProviderForm;
