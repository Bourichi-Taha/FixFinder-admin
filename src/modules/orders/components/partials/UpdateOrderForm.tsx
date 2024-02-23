import { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import useOrders, {  UpdateOneInput } from '@modules/orders/hooks/api/useOrders';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import { Order, STATUS_ORDERS } from '@modules/orders/defs/types';
import { STATUS_ORDERS_OPTIONS } from '@modules/orders/defs/options';
import useServices from '@modules/services/hooks/api/useServices';
import UpdateCrudItemForm from '@common/components/partials/UpdateCrudItemForm';

interface UpdateOrderFormProps { 
    item:Order
 }

const UpdateOrderForm = (_props: UpdateOrderFormProps) => {
    const router = useRouter();
    const {item} = _props;
    const { items: services } = useServices({ fetchItems: true });

    const schema = Yup.object().shape({
        description: Yup.string().required('Le champ est obligatoire'),
        title: Yup.string().required('Le champ est obligatoire'),
        price: Yup.number().min(0).required('Le champ est obligatoire'),
        status: Yup.mixed<STATUS_ORDERS>()
            .oneOf(Object.values(STATUS_ORDERS), (_values) => {
                return `Le champ doit avoir l'une des valeurs suivantes : ${STATUS_ORDERS_OPTIONS.map(
                    (option) => option.label
                ).join(', ')}`;
            })
            .required('Le champ est obligatoire'),
        serviceId: Yup.number().required('Le champ est obligatoire'),
    });
    const defaultValues: UpdateOneInput = {
        clientId: item.clientId,
        id: item.id,
        serviceId: item.serviceId,
        status: item.status,
        description: item.description,
        title: item.title,
        price: item.price,
    };
    const onPostSubmit = async (
        _data: UpdateOneInput,
        response: ItemResponse<Order>,
        _methods: UseFormReturn<UpdateOneInput>
    ) => {
        if (response.success) {
            router.push(Routes.Orders.ReadAll);
        }
    };
    return (
        <>
            <UpdateCrudItemForm<Order, UpdateOneInput>
                routes={Routes.Orders}
                useItems={useOrders}
                schema={schema}
                defaultValues={defaultValues}
                onPostSubmit={onPostSubmit}
                item={item}
            >
                <Grid container spacing={3} sx={{ padding: 6 }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <RHFTextField name="description" label="Description" multiline maxRows={2} minRows={2} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={12}>
                        <RHFTextField name="title" label="Titre"  />
                    </Grid>
                    <Grid item xs={6} sm={6} md={12}>
                        <RHFTextField name="price" label="Prix" type='number'  />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RHFSelect name="serviceId" label="Service" >
                            {
                                services && services.map((service) => {
                                    return (
                                        <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                                    )
                                })
                            }
                        </RHFSelect>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <RHFSelect name="status" label="Status">
                            {STATUS_ORDERS_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                    </Grid>
                </Grid>
            </UpdateCrudItemForm>
        </>
    );
};

export default UpdateOrderForm;
