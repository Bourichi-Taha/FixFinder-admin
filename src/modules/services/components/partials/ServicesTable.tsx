import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow, Id } from '@common/defs/types';
import { Service } from '@modules/services/defs/types';
import useServices, { CreateOneInput, UpdateOneInput } from '@modules/services/hooks/api/useServices';

interface Row extends CrudRow {
  name: string;
  categoryId: Id;
  description: string;
  price: number;
}

const ServicesTable = () => {
  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Service',
      flex: 1,
    },
    {
      field: 'categoryName',
      headerName: 'Catégorie',
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

  const itemToRow = (item: Service): Row => {
    return {
      id: item.id,
      categoryId: item.categoryId,
      name: item.name,
      createdAt: item.createdAt,
      price: item.price,
      description: item.description,
      categoryName: item.category?.name,
    };
  };

  return (
    <>
      <ItemsTable<Service, CreateOneInput, UpdateOneInput, Row>
        namespace={Namespaces.Services}
        routes={Routes.Services}
        useItems={useServices}
        columns={columns}
        itemToRow={itemToRow}
      />
    </>
  );
};

export default ServicesTable;
