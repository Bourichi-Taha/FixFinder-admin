import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';
import PageHeader from '@common/components/lib/partials/PageHeader';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import OrdersTable from '@modules/orders/components/partials/OrdersTable';

const OrdersPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={Labels.Orders.ReadAll}
        action={{
          label: Labels.Orders.NewOne,
          startIcon: <Add />,
          onClick: () => router.push(Routes.Orders.CreateOne),
          permission: {
            entity: Namespaces.Orders,
            action: CRUD_ACTION.CREATE,
          },
        }}
      />
      <CustomBreadcrumbs
        links={[{ name: 'Dashboard', href: Routes.Common.Home }, { name: Labels.Orders.Items }]}
      />
      <OrdersTable />
    </>
  );
};

export default withAuth(
  withPermissions(OrdersPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Orders,
        action: CRUD_ACTION.READ,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
