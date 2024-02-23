import { CrudObject, Id } from '@common/defs/types';
import { Category } from '@modules/categories/defs/types';
import { Provider } from '@modules/providers/defs/types';
import { Service } from '@modules/services/defs/types';
import { User } from '@modules/users/defs/types';
import { Dayjs } from 'dayjs';


export interface Booking extends CrudObject {
  clientId: Id;
  providerId: Id;
  serviceId: Id;
  booking_datetime: string | Dayjs;
  status: STATUS;
  client?:User;
  provider?:Provider;
  service?:Service;
}

export enum STATUS {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
