import ApiRoutes from '@common/defs/apiRoutes';
import { Id } from '@common/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Service } from '@modules/services/defs/types';

export interface CreateOneInput {
  name: string;
  categoryId: Id;
  description: string;
  price: number;
}

export interface UpdateOneInput {
  name: string;
  categoryId: Id;
  description: string;
  price: number;

}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useServices: UseItems<Service, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Services;
  const useItemsHook = useItems<Service, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useServices;
