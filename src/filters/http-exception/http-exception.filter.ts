import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express'; // express types for req/res, same as guards

@Catch() // no arg = catches EVERYTHING thrown, not just HttpException
export class HttpExceptionFilter<T> implements ExceptionFilter {

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // narrow ArgumentsHost to the HTTP context
    const response = ctx.getResponse<Response>(); // express Response, used to send the reply
    const request = ctx.getRequest<Request>(); // express Request, used to read the url

    const isHttpException = exception instanceof HttpException; // deliberate throw (NotFoundException etc.) vs a real bug
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; // real status, or 500 for unknown errors
    const message = isHttpException ? exception.getResponse() : 'Internal server error'; // real message, or a safe generic one

    if (!isHttpException) {
      console.error(exception); // log the real error server-side; never send it to the client
    }

    response.status(status).json({
      statusCode: status, // numeric code, e.g. 404
      timestamp: new Date().toISOString(), // when the error was handled
      path: request.url, // which route triggered it
      message, // client-facing message (safe even for 500s)
    });
  }
}
