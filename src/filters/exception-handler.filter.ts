import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        // const nextFn = ctx.getNext<NextFunction>();

        console.log(exception)
        const requestTime = new Date().toISOString();

        if(exception instanceof HttpException){
            response.status(exception.getStatus()).json({
                message: exception.message,
                requestTime,
                url: request.url,
                errorName: exception.name,
                statusCode: exception.getStatus(),
            })
        }else{
            response.status(500).json({
                message: exception?.message || "Internal server error",
                requestTime,
                url: request.url,
                errorName: exception?.name,
                statusCode: 500,
            })
        }
    }
}