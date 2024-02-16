import Auth from '@modules/auth/defs/routes';
import Users from '@modules/users/defs/routes';
import Permissions from '@modules/permissions/defs/routes';
import Notifications from '@modules/notifications/defs/routes';
import Reviews from '@modules/reviews/defs/routes';
import Bookings from '@modules/bookings/defs/routes';
import Categories from '@modules/categories/defs/routes';
import Providers from '@modules/providers/defs/routes';
const Common = {
  Home: '/',
  NotFound: '/404',
};

const Routes = {
  Common,
  Auth,
  Permissions,
  Users,
  Notifications,
  Reviews,
  Bookings,
  Categories,
  Providers,
};

export default Routes;
