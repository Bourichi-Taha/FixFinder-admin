import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { User } from '@modules/users/defs/types';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow, Id } from '@common/defs/types';
import { Chip, Tooltip } from '@mui/material';
import { ROLES_OPTIONS } from '@modules/permissions/defs/options';
import { ROLE } from '@modules/permissions/defs/types';
import { Provider } from '@modules/providers/defs/types';
import useProviders,{ CreateOneInput, UpdateOneInput } from '@modules/providers/hooks/api/useProviders';
import Link from 'next/link';

interface Row extends CrudRow {
  id: Id,
  userId: Id,
  description: string,
  createdAt: string,
  availabilitySchedule: string,
  hourlyRate: number,
  averageRating: number,
  email: string,
  name: string,
  isEmailValid: boolean,
}

const ProvidersTable = () => {
  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'userId',
      headerName: 'User Id',
      width: 100,
      renderCell: (params) => {
        return (
          <Link href={Routes.Users.ReadAll} >{params.row.userId}</Link>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Full name',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'availabilitySchedule',
      headerName: 'Availability Schedule',
      flex: 1,
    },
    {
      field: 'hourlyRate',
      headerName: 'Hourly Rate',
      flex: 1,
    },
    {
      field: 'averageRating',
      headerName: 'Average Rating',
      flex: 1,
    },
    {
      field: 'isEmailValid',
      headerName: 'Email verified',
      width: 70,
      renderCell: (params) => {
        const { row: item } = params;
        const { isEmailValid } = item;
        if (isEmailValid) {
          return (
            <Tooltip title={'Verified'}>
              <CheckCircleIcon color='success' />
            </Tooltip>
          );
        }
        return (
          <Tooltip title={'Not verified'}>
            <CancelIcon color='error' />
          </Tooltip>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: "Date d'inscription",
      type: 'dateTime',
      flex: 1,
      renderCell: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY hh:mm'),
    },
  ];

  const itemToRow = (item: Provider): Row => {
    return {
      id: item.id,
      userId: item.userId,
      description: item.description,
      createdAt: item.createdAt,
      availabilitySchedule: item.availabilitySchedule,
      hourlyRate: item.hourlyRate,
      averageRating: item.averageRating,
      email: item.user.email,
      name: item.user.firstname + ' ' + item.user.lastname,
      isEmailValid: item.user.emailVerifiedAt !== null,
    };
  };

  return (
    <>
      <ItemsTable<Provider, CreateOneInput, UpdateOneInput, Row>
        namespace={Namespaces.Providers}
        routes={Routes.Providers}
        useItems={useProviders}
        columns={columns}
        itemToRow={itemToRow}
      />
    </>
  );
};

export default ProvidersTable;
