import ApiRoutes from '@common/defs/apiRoutes';
import { Id } from '@common/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Booking, STATUS } from '@modules/bookings/defs/types';
import { Dayjs } from 'dayjs';

export interface CreateOneInput {
    clientId: Id;
    providerId: Id;
    categoryId: Id;
    booking_datetime: string | Dayjs;
    status: STATUS;
}

export interface UpdateOneInput {
    clientId: Id;
    providerId: Id;
    categoryId: Id;
    booking_datetime: string | Dayjs;
    status: STATUS;

}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useBookings: UseItems<Booking, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Bookings;
  const useItemsHook = useItems<Booking, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useBookings;
