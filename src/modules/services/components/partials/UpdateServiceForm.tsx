import { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import UpdateCrudItemForm from '@common/components/partials/UpdateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import useCategories from '@modules/categories/hooks/api/useCategories';
import { Service } from '@modules/services/defs/types';
import useServices, { UpdateOneInput } from '@modules/services/hooks/api/useServices';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

interface UpdateServiceFormProps {
  item: Service;
}

const UpdateServiceForm = (props: UpdateServiceFormProps) => {
  const { item } = props;
  const router = useRouter();
  const { items: categories } = useCategories({ fetchItems: true });
  const schema = Yup.object().shape({
    name: Yup.string().required('Le champ est obligatoire'),
    description: Yup.string(),
    price: Yup.number().min(0).required('Le champ est obligatoire'),
    categoryId: Yup.number().required('Le champ est obligatoire'),
  });
  const defaultValues: UpdateOneInput = {
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
  };
  const onPostSubmit = async (
    _data: UpdateOneInput,
    response: ItemResponse<Service>,
    _methods: UseFormReturn<UpdateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.Services.ReadAll);
    }
  };
  return (
    <>
      <UpdateCrudItemForm<Service, UpdateOneInput>
        item={item}
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
            <RHFTextField name="description" label="Description" multiline maxRows={4} minRows={2} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSelect name="categoryId" label="Catégorie" >
              {
                categories && categories.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  )
                })
              }
            </RHFSelect>
          </Grid>
        </Grid>
      </UpdateCrudItemForm>
    </>
  );
};

export default UpdateServiceForm;
