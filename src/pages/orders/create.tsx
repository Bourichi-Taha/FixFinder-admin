import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import CreateServiceForm from '@modules/services/components/partials/CreateServiceForm';
import CreateOrderForm from '@modules/orders/components/partials/CreateOrderForm';

const OrdersPage: NextPage = () => {
  return (
    <>
      <PageHeader title={Labels.Orders.CreateNewOne} />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Orders.Items, href: Routes.Orders.ReadAll },
          { name: Labels.Orders.NewOne },
        ]}
      />
      <CreateOrderForm />
    </>
  );
};

export default withAuth(
  withPermissions(OrdersPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Orders,
        action: CRUD_ACTION.CREATE,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
