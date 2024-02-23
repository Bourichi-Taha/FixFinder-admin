import ApiRoutes from '@common/defs/apiRoutes';
import { Id } from '@common/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Order, STATUS_ORDERS } from '@modules/orders/defs/types';

export interface CreateOneInput {
    clientId: Id;
    serviceId: Id;
    status: STATUS_ORDERS;
    description: string;
    title: string;
    price: number;

}

export interface UpdateOneInput {
    clientId: Id;
    serviceId: Id;
    status: STATUS_ORDERS;
    description: string;
    title: string;
    price: number;

}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useOrders: UseItems<Order, CreateOneInput, UpdateOneInput> = (
    opts: UseItemsOptions = defaultOptions
) => {
    const apiRoutes = ApiRoutes.Orders;
    const useItemsHook = useItems<Order, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
    return useItemsHook;
};

export default useOrders;
