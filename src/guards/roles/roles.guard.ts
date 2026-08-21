import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // reads metadata attached by @SetMetadata (via our Roles decorator)
import { Observable } from 'rxjs'; // use Observable for async operations
import { Request } from 'express'; // use express Request type for typing the request object
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // DI'd — must be applied via @UseGuards()/APP_GUARD, never `new RolesGuard()`

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(), // exact controller method being called (vs getClass() for controller-level metadata)
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // route has no @Roles() -> no restriction
    }

    const request = context.switchToHttp().getRequest<Request & { user?: { role: Role } }>();// get the request object from the execution context, with a user property for typing

    // TODO: decode a real JWT instead — this reads a plain x-role header so both
    // roles can be tested by hand; default to User (the lower-privilege role) if omitted
    const roleHeader = request.headers['x-role'];// read the role from a custom header (for testing purposes)
    const role = roleHeader === 'admin' ? Role.Admin : Role.User;// default to User if header is missing or not 'admin'
    request.user = { role }; // identity is resolved here, only for routes that actually declare @Roles()

    const { user } = request;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(`Requires role(s): ${requiredRoles.join(', ')}`); // authenticated fine, just not permitted -> 403, not 401
    }

    return true; // role check passed -> handler runs
  }
}
