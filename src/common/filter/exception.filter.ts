import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(ExceptionsFilter.name);


    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        const statusCode = this.getStatus(exception);
        const errorResponse = this.formatError(exception);

        this.logger.error(
            `Error ${statusCode} - ${req.method} ${req.url}`
        );

        res.status(statusCode).json({
            statusCode,
            timestamp: new Date().toISOString(),
            path: req.url,
            method: req.method,
            errorType: exception.name || 'UnknownError',
            message: errorResponse,
        });



    }

    private getStatus(exception: any): number {
        return exception?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    }

    private formatError(exception: any): string[] {
        if (Array.isArray(exception.response?.message)) {
            return exception.response.message;
        }

        if (typeof exception.message === 'string') {
            return [exception.message];
        }

        return ['Unexpected error occurred'];
    }
}
