import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Catch(HttpException)
export class ExceptionHandlerFilterr implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        // const nextFn = ctx.getNext<NextFunction>();

        const requestTime = new Date().toISOString();
        response.status(exception.getStatus()).json({
            message: exception.message,
            requestTime,
            url: request.url,
            errorName: exception.name,
            statusCode: exception.getStatus(),
        })
    }
}