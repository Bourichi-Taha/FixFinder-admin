import { CrudRoutes } from '@common/defs/types';

const prefix = '/notifications';
const Routes: CrudRoutes = {
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
};

export default Routes;