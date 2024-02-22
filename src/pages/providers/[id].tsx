import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import { useRouter } from 'next/router';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useEffect, useState } from 'react';
import useProgressBar from '@common/hooks/useProgressBar';
import { CRUD_ACTION, Id } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import { ROLE } from '@modules/permissions/defs/types';
import useProviders from '@modules/providers/hooks/api/useProviders';
import { Provider } from '@modules/providers/defs/types';
import UpdateProviderForm from '@modules/providers/components/partials/UpdateProviderForm';

const ProvidersPage: NextPage = () => {
  const router = useRouter();
  const { start, stop } = useProgressBar();
  const { readOne } = useProviders();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState<null | Provider>(null);
  const id: Id = Number(router.query.id);

  useEffect(() => {
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    fetchProvider();
  }, [id]);

  const fetchProvider = async () => {
    if (id) {
      const { data } = await readOne(id);
      if (data) {
        if (data.item) {
          setItem(data.item);
        }
      }
      setLoaded(true);
    }
  };

  return (
    <>
      <PageHeader title={Labels.Providers.EditOne} />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Providers.Items, href: Routes.Providers.ReadAll },
          { name: item ? item.email : Labels.Providers.EditOne },
        ]}
      />

      {item && <UpdateProviderForm item={item} />}{/* need to add provider update form */}
    </>
  );
};

export default withAuth(
  withPermissions(ProvidersPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Providers,
        action: CRUD_ACTION.UPDATE,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
