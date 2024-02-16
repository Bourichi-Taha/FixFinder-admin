import { CrudObject, Id } from '@common/defs/types';
import { Location } from '@modules/locations/defs/types';
import { ROLE } from '@modules/permissions/defs/types';
import { Upload } from '@modules/uploads/defs/types';

export interface User extends CrudObject {
  email: string;
  rolesNames: ROLE[];
  permissionsNames: string[];
  firstname: string;
  lastname: string;
  phone: string;
  avatarId:Id;
  loacationId:Id;
  rating:string;
  location:Location;
  avatar:Upload;
}
