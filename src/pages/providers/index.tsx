import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import UsersTable from '@modules/users/components/partials/UsersTable';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';
import PageHeader from '@common/components/lib/partials/PageHeader';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import ProvidersTable from '@modules/providers/components/partials/ProvidersTable';

const ProvidersPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={Labels.Providers.ReadAll}
        action={{
          label: Labels.Providers.NewOne,
          startIcon: <Add />,
          onClick: () => router.push(Routes.Providers.CreateOne),
          permission: {
            entity: Namespaces.Providers,
            action: CRUD_ACTION.CREATE,
          },
        }}
      />
      <CustomBreadcrumbs
        links={[{ name: 'Dashboard', href: Routes.Common.Home }, { name: Labels.Providers.Items }]}
      />
      <ProvidersTable />
    </>
  );
};

export default withAuth(
  withPermissions(ProvidersPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Providers,
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
