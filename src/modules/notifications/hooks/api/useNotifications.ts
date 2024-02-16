import ApiRoutes from '@common/defs/apiRoutes';
import { Id } from '@common/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Notification } from '@modules/notifications/defs/types';

export interface CreateOneInput {
    userId: Id;
    message: string;
    isRead:boolean;
}

export interface UpdateOneInput {
    userId: Id;
    message: string;
    isRead:boolean;
}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useNotifications: UseItems<Notification, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Notifications;
  const useItemsHook = useItems<Notification, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useNotifications;
