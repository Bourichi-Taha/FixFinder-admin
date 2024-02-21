import { CrudObject, Id } from '@common/defs/types';

export interface Provider extends CrudObject {
  userId: Id;
  description:string;
  availabilitySchedule:string;
  hourlyRate:number;
  averageRating:number;
}
