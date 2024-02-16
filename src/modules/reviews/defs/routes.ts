import { CrudRoutes } from '@common/defs/types';

const prefix = '/reviews';
const Routes: CrudRoutes = {
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
};

export default Routes;