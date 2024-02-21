import ApiRoutes from '@common/defs/apiRoutes';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Id } from '@common/defs/types';
import { Provider } from '@modules/providers/defs/types';
export interface CreateOneInput  {
    userId: Id;
    description?: string;
    availabilitySchedule?: string;
    hourlyRate?: number;
    averageRating?: number;
}

export interface UpdateOneInput  {
    userId: Id;
    description?: string;
    availabilitySchedule?: string;
    hourlyRate?: number;
    averageRating?: number;
}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useProviders: UseItems<Provider, CreateOneInput, UpdateOneInput> = (
    opts: UseItemsOptions = defaultOptions
) => {
    const apiRoutes = ApiRoutes.Providers;
    const useItemsHook = useItems<Provider, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
    return useItemsHook;
};

export default useProviders;
