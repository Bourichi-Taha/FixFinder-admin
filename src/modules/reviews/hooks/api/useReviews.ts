import ApiRoutes from '@common/defs/apiRoutes';
import { Id } from '@common/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Review } from '@modules/reviews/defs/types';

export interface CreateOneInput {
    reviewerId: Id;
    revieweeId: Id;
    bookingId:Id;
    rating:number;
    review_text:string;
}

export interface UpdateOneInput {
    reviewerId: Id;
    revieweeId: Id;
    bookingId:Id;
    rating:number;
    review_text:string;
}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useReviews: UseItems<Review, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Reviews;
  const useItemsHook = useItems<Review, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useReviews;
