import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';// use Observable for async operations
import { Request } from 'express';// use express Request type for typing the request object

const VALID_API_KEY = 'secret123'; // TODO: move to env/ConfigService in a real app

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();// get the request object from the execution context
    const key = request.headers['x-api-key'];

    if (key !== VALID_API_KEY) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true; // key valid -> identity/role is resolved later, by RolesGuard, only on routes that need it
  }
}
