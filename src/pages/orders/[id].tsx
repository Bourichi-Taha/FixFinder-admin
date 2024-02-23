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
import UpdateOrderForm from '@modules/orders/components/partials/UpdateOrderForm';
import useOrders from '@modules/orders/hooks/api/useOrders';
import { Order } from '@modules/orders/defs/types';

const OrdersPage: NextPage = () => {
  const router = useRouter();
  const { start, stop } = useProgressBar();
  const { readOne } = useOrders();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState<null | Order>(null);
  const id: Id = Number(router.query.id);

  useEffect(() => {
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
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
      <PageHeader title={Labels.Orders.EditOne} />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Orders.Items, href: Routes.Orders.ReadAll },
          { name: Labels.Orders.EditOne },
        ]}
      />

      {item && <UpdateOrderForm item={item} />}
    </>
  );
};

export default withAuth(
  withPermissions(OrdersPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Orders,
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
