import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';// use a constant to avoid typos and make it easier to change the key in the future
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);// use a decorator factory to create a decorator that can be used on controllers and methods

//custom decorater it is