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
import ServicesTable from '@modules/services/components/partials/ServicesTable';

const ServicesPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={Labels.Services.ReadAll}
        action={{
          label: Labels.Services.NewOne,
          startIcon: <Add />,
          onClick: () => router.push(Routes.Services.CreateOne),
          permission: {
            entity: Namespaces.Services,
            action: CRUD_ACTION.CREATE,
          },
        }}
      />
      <CustomBreadcrumbs
        links={[{ name: 'Dashboard', href: Routes.Common.Home }, { name: Labels.Services.Items }]}
      />
      <ServicesTable />
    </>
  );
};

export default withAuth(
  withPermissions(ServicesPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Services,
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
