import { Id } from '@common/defs/types';
import { User } from '@modules/users/defs/types';

export interface Provider extends User {
  userId: Id;
  description:string;
  availability_schedule:string;
  hourly_rate:number;
  average_rating:number;
}
