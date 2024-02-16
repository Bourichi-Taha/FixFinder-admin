import { CrudObject, Id } from '@common/defs/types';
import { Category } from '@modules/categories/defs/types';
import { Provider } from '@modules/providers/defs/types';
import { User } from '@modules/users/defs/types';
import { Dayjs } from 'dayjs';


export interface Booking extends CrudObject {
  clientId: Id;
  providerId: Id;
  categoryId: Id;
  booking_datetime: string | Dayjs;
  status: STATUS;
  client?:User;
  provider?:Provider;
  category?:Category;
}

export enum STATUS {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
