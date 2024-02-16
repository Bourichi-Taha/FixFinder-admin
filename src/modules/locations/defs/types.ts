import { CrudObject, Id } from '@common/defs/types';

export interface Location extends CrudObject {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;

}
