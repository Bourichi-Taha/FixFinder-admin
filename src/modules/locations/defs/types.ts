import { CrudObject, Id } from '@common/defs/types';

export interface Location extends CrudObject {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;

}
