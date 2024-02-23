import { STATUS_ORDERS } from '@modules/orders/defs/types';

export const STATUS_ORDERS_OPTIONS = [
  { value: STATUS_ORDERS.ACTIVE, label: 'Activé' },
  { value: STATUS_ORDERS.CONFIRMED, label: 'Confirmé' },
  { value: STATUS_ORDERS.COMPLETED, label: 'Terminé' },
  { value: STATUS_ORDERS.CANCELLED, label: 'Annulé' },
];