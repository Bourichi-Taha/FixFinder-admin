import { CrudObject, Id } from '@common/defs/types';
import { Booking } from '@modules/bookings/defs/types';
import { Provider } from '@modules/providers/defs/types';
import { User } from '@modules/users/defs/types';


export interface Review extends CrudObject {
  reviewerId: Id;
  revieweeId: Id;
  bookingId:Id;
  rating:number;
  review_text:string;
  reviewer?:User;
  reviewee?:Provider;
  booking?:Booking;
}
