import { CrudRoutes } from '@common/defs/types';

const prefix = '/users';
const Routes: CrudRoutes = {
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
};

export default Routes;
