import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { User } from '@modules/users/defs/types';
import useUsers, { CreateOneInput, UpdateOneInput } from '@modules/users/hooks/api/useUsers';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow } from '@common/defs/types';
import { Chip, Tooltip } from '@mui/material';
import { ROLES_OPTIONS } from '@modules/permissions/defs/options';
import { ROLE } from '@modules/permissions/defs/types';

interface Row extends CrudRow {
  email: string;
  createdAt: string;
  rolesNames: string[];
  firstname: string;
  lastname: string;
  phone: string;
  rating: number;
  isEmailValid: boolean;
}

const UsersTable = () => {
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
      field: 'firstname',
      headerName: 'firstname',
      flex: 1,
    },
    {
      field: 'lastname',
      headerName: 'lastname',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'phone',
      flex: 1,
    },
    {
      field: 'rating',
      headerName: 'rating',
      flex: 1,
    },
    {
      field: 'roles',
      headerName: 'Admin',
      width: 125,
      renderCell: (params) => {
        const { row: item } = params;
        const { rolesNames } = item;
        if (rolesNames.includes('admin')) {
          return (
            <Tooltip title={ROLES_OPTIONS.find((opt) => opt.value === ROLE.ADMIN)?.label}>
              <Chip color='info'  label={ROLES_OPTIONS.find((opt) => opt.value === ROLE.ADMIN)?.label} />
            </Tooltip>
          );
        } else if (rolesNames.includes('provider')) {
          return (
            <Tooltip title={ROLES_OPTIONS.find((opt) => opt.value === ROLE.PROVIDER)?.label}>
              <Chip color='secondary' label={ROLES_OPTIONS.find((opt) => opt.value === ROLE.PROVIDER)?.label} />
            </Tooltip>
          );
        }
        return (
          <Tooltip title={ROLES_OPTIONS.find((opt) => opt.value === ROLE.USER)?.label}>
            <Chip color='success' label={ROLES_OPTIONS.find((opt) => opt.value === ROLE.USER)?.label} />
          </Tooltip>
        );
      },
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

  const itemToRow = (item: User): Row => {
    return {
      id: item.id,
      email: item.email,
      createdAt: item.createdAt,
      rolesNames: item.rolesNames,
      firstname: item.firstname,
      lastname: item.lastname,
      phone: item.phone,
      rating: item.rating || 0,
      isEmailValid: item.emailVerifiedAt !== null,
    };
  };

  return (
    <>
      <ItemsTable<User, CreateOneInput, UpdateOneInput, Row>
        namespace={Namespaces.Users}
        routes={Routes.Users}
        useItems={useUsers}
        columns={columns}
        itemToRow={itemToRow}
      />
    </>
  );
};

export default UsersTable;
