import { CrudObject, Id } from '@common/defs/types';
import { Category } from '@modules/categories/defs/types';


export interface Service extends CrudObject {
  name: string;
  categoryId: Id;
  description: string;
  price: number;
  category?: Category;
}
