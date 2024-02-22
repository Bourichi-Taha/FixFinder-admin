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

const ServicesPage: NextPage = () => {
  return (
    <>
      <PageHeader title={Labels.Services.CreateNewOne} />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Services.Items, href: Routes.Services.ReadAll },
          { name: Labels.Services.NewOne },
        ]}
      />
      <CreateServiceForm />
    </>
  );
};

export default withAuth(
  withPermissions(ServicesPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Services,
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
