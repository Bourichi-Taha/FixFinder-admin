import { CrudObject, Id } from '@common/defs/types';


export interface Notification extends CrudObject {
  userId: Id;
  message: string;
  isRead:boolean;
}
