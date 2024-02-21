import ApiRoutes from '@common/defs/apiRoutes';
import { ROLE } from '@modules/permissions/defs/types';
import { User } from '@modules/users/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Id } from '@common/defs/types';

export interface CreateOneInput {
  email: string;
  password: string;
  role: ROLE;
  firstname: string;
  lastname: string;
  phone: string;
  avatarId:Id;
  locationId:Id;
  rating?:number;
  avatar:File;
  name?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  userId?: Id;
  description?: string;
  hourlyRate?: number;
}

export interface UpdateOneInput {
  email: string;
  password: string;
  role: ROLE;
  firstname: string;
  lastname: string;
  phone: string;
  avatarId:Id;
  locationId:Id;
  rating?:number;
  avatar:File;
  name?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  userId?: Id;
  description?: string;
  hourlyRate?: number;
}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useUsers: UseItems<User, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Users;
  const useItemsHook = useItems<User, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useUsers;
