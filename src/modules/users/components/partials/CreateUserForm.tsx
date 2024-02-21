import FormProvider, { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import RHFImageDropzone from '@common/components/lib/react-hook-form/RHFImageDropzone';
import RHFPhoneField from '@common/components/lib/react-hook-form/RHFPhoneField';
import Routes from '@common/defs/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import useLocations from '@modules/locations/hooks/api/useLocations';
import useGetLocation from '@modules/locations/hooks/useGetLoacation';
import { ROLES_OPTIONS } from '@modules/permissions/defs/options';
import { ROLE } from '@modules/permissions/defs/types';
import useProviders from '@modules/providers/hooks/api/useProviders';
import useUploads from '@modules/uploads/hooks/api/useUploads';
import useUsers, { CreateOneInput } from '@modules/users/hooks/api/useUsers';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface CreateUserFormProps { }

const CreateUserForm = (_props: CreateUserFormProps) => {
  const router = useRouter();
  const { createOne: createOneUpload } = useUploads();
  const { createOne: createOneLocation } = useLocations();
  const { createOne: createOneUser } = useUsers();
  const { createOne: createOneProvider } = useProviders();
  const { location } = useGetLocation();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Le format de l'email est incorrect")
      .required('Le champ est obligatoire'),
    password: Yup.string().required('Le champ est obligatoire'),
    phone: Yup.string().required('Le champ est obligatoire'),
    firstname: Yup.string().required('Le champ est obligatoire'),
    role: Yup.mixed<ROLE>()
      .oneOf(Object.values(ROLE), (_values) => {
        return `Le champ doit avoir l'une des valeurs suivantes : ${ROLES_OPTIONS.map(
          (option) => option.label
        ).join(', ')}`;
      })
      .required('Le champ est obligatoire'),
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
    }).required('Le champ est obligatoire'),
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

  const methods = useForm<CreateOneInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch
  } = methods;
  const { role } = watch();
  const onSubmit = async (data: CreateOneInput) => {
    const dataUpload = { file: data.avatar };
    const uploadResponse = await createOneUpload(dataUpload);
    if (uploadResponse.data) {
      data.avatarId = uploadResponse.data?.item.id;
    }
    let dataLocation;
    if (location?.latitude && location.longitude) {
      dataLocation = { latitude: location.latitude, longitude: location.longitude }
    }
    dataLocation = {...dataLocation, address: data.address }
    dataLocation = { ...dataLocation, city: data.city }
    dataLocation = { ...dataLocation, country: data.country }
    if (data.postalCode) {
      dataLocation = { ...dataLocation, postalCode: data.postalCode }
    }
    if (data.state) {
      dataLocation = { ...dataLocation, state: data.state }
    }
    const locationResponse = await createOneLocation(dataLocation);
    if (locationResponse.data) {
      data.locationId = locationResponse.data?.item.id;
    }
    const response = await createOneUser(data, {
      displayProgress: true,
      displaySuccess: true,
    });
    if (response.data && data.role === ROLE.PROVIDER) {
      await createOneProvider({ userId: response.data?.item.id, description: data.description, hourlyRate: data.hourlyRate })
    }
    router.push(Routes.Users.ReadAll);
  };

  return (
    <>
      <Card sx={{ maxWidth: '800px', margin: 'auto' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} columnSpacing={2} sx={{ padding: 5 }}>
            <Grid item sm={12}>
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
            <Grid item xs={12} sm={12} md={6}>
              <RHFSelect name="role" label="Rôle">
                {ROLES_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <RHFTextField name="address" label={"address"} minRows={2} maxRows={3} multiline />
            </Grid>
            {role === ROLE.PROVIDER &&
              <Grid item xs={12} sm={12} md={12}>
                <RHFTextField name="description" label={"description"} minRows={2} maxRows={3} multiline />
              </Grid>}
            {role === ROLE.PROVIDER &&
              <Grid item xs={12} sm={12} md={6}>
                <RHFTextField name="hourlyRate" label={"hourlyRate"} type='number'  />
              </Grid>}
            {role === ROLE.PROVIDER &&
              <Grid item xs={12} sm={12} md={6}>
                <RHFTextField name="availabilitySchedule" label={"availabilitySchedule"}  />
              </Grid>}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                startIcon={<LockOpen />}
                loadingPosition="start"
                loading={isSubmitting}
              >
                Créer
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </>
  );
};

export default CreateUserForm;
