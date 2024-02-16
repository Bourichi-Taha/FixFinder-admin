import ApiRoutes from '@common/defs/apiRoutes';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Id } from '@common/defs/types';
import { CreateOneInput as CreateOneUserInput,UpdateOneInput as UpdateOneUserInput } from '@modules/users/hooks/api/useUsers';import { Provider } from '@modules/providers/defs/types';

export interface CreateOneInput extends CreateOneUserInput {
    userId: Id;
    description: string;
    availability_schedule: string;
    hourly_rate?: number;
    average_rating?: number;
}

export interface UpdateOneInput extends UpdateOneUserInput {
    userId: Id;
    description: string;
    availability_schedule: string;
    hourly_rate?: number;
    average_rating?: number;
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
