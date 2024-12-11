export class ErrorMsg extends Error {

    constructor(message: string, public status: number) {
        super(message);
        this.status = status || 500;
        Error.captureStackTrace(this, this.constructor);
    }
}