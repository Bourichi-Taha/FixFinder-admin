import { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import useServices, { CreateOneInput } from '@modules/services/hooks/api/useServices';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import { Service } from '@modules/services/defs/types';
import useCategories from '@modules/categories/hooks/api/useCategories';

interface CreateServiceFormProps {}

const CreateServiceForm = (_props: CreateServiceFormProps) => {
  const router = useRouter();
  const {items:categories} = useCategories({fetchItems:true});
  const schema = Yup.object().shape({
    name: Yup.string().required('Le champ est obligatoire'),
    description: Yup.string(),
    price: Yup.number().min(0).required('Le champ est obligatoire'),
    categoryId: Yup.number().required('Le champ est obligatoire'),
  });
  const defaultValues: CreateOneInput = {
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
  };
  const onPostSubmit = async (
    _data: CreateOneInput,
    response: ItemResponse<Service>,
    _methods: UseFormReturn<CreateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.Services.ReadAll);
    }
  };
  return (
    <>
      <CreateCrudItemForm<Service, CreateOneInput>
        routes={Routes.Services}
        useItems={useServices}
        schema={schema}
        defaultValues={defaultValues}
        onPostSubmit={onPostSubmit}
      >
        <Grid container spacing={3} sx={{ padding: 6 }}>
          <Grid item xs={12} md={6}>
            <RHFTextField name="name" label="Name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="price" label="Price" type='number' />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="description" label="Description" multiline maxRows={4} minRows={1} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSelect name="categoryId" label="Catégorie" >
              {
                categories && categories.map((category)=>{
                  return (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  )
                })
              }
            </RHFSelect>
          </Grid>
        </Grid>
      </CreateCrudItemForm>
    </>
  );
};

export default CreateServiceForm;
