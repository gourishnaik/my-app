import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; // raw express types, same as guards

@Injectable()
export class LoggeerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req; // e.g. GET /task/1
    const start = Date.now(); // to measure how long the request took

    res.on('finish', () => { // fires after the response has actually been sent
      const duration = Date.now() - start;
      console.log(` logger middleware ${method} ${originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    next(); // MUST call this or the request hangs forever
  }
}
