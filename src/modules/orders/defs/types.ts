import { CrudObject, Id } from '@common/defs/types';
import { Service } from '@modules/services/defs/types';
import { User } from '@modules/users/defs/types';


export interface Order extends CrudObject {
  clientId: Id;
  serviceId: Id;
  status: STATUS_ORDERS;
  description: string;
  title: string;
  price: number;
  client:User;
  service:Service;
}
export enum STATUS_ORDERS {
  ACTIVE = 'active',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
