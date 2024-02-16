import { STATUS } from '@modules/bookings/defs/types';

export const STATUS_OPTIONS = [
  { value: STATUS.PENDING, label: 'En attente' },
  { value: STATUS.CONFIRMED, label: 'Confirmé' },
  { value: STATUS.COMPLETED, label: 'Terminé' },
  { value: STATUS.CANCELLED, label: 'Annulé' },
];
