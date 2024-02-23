import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow } from '@common/defs/types';
import { Order, STATUS_ORDERS } from '@modules/orders/defs/types';
import useOrders, { CreateOneInput, UpdateOneInput } from '@modules/orders/hooks/api/useOrders';

interface Row extends CrudRow {
    email: string ;
    serviceName: string;
    status: STATUS_ORDERS;
    description: string;
    title: string;
    price: number;
}

const OrdersTable = () => {
    const columns: GridColumns<Row> = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'serviceName',
            headerName: 'service',
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
        },
        {
            field: 'title',
            headerName: 'Titre',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
        },
        {
            field: 'price',
            headerName: 'Prix',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: "Date d'inscription",
            type: 'dateTime',
            flex: 1,
            renderCell: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY hh:mm'),
        },
    ];

    const itemToRow = (item: Order): Row => {
        return {
            id: item.id,
            title: item.title,
            email: item.client.email,
            serviceName: item.service.name,
            status: item.status,
            description: item.description,
            createdAt: item.createdAt,
            price: item.price,
        };
    };

    return (
        <>
            <ItemsTable<Order, CreateOneInput, UpdateOneInput, Row>
                namespace={Namespaces.Orders}
                routes={Routes.Orders}
                useItems={useOrders}
                columns={columns}
                itemToRow={itemToRow}
            />
        </>
    );
};

export default OrdersTable;
