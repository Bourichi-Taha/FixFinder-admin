import { Id } from '@common/defs/types';

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  PROVIDER = 'provider',
}

export interface Permission {
  entity: string;
  action: string;
  entityId?: Id;
}
