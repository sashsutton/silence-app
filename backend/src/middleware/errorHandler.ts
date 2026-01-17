import type {Request, Response, NextFunction} from 'express';

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.log(error.message);
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: error.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });

}

// if status code is 200 and we still hit the error handler that means it's an internal server error
// so we set the status code to 500