// error handler

import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
    code?: number;
    keyValue?: { [key: string]: string };
    name: string;
  }
  

 const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
    };

    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: 'Unauthorized: Your token has expired. Login again..' })
    }
    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: 'Unauthorized: Invalid token..' })
    }
    if (error.code === 11000) {
        const keyName = Object.keys(error.keyValue ?? {})[0];
        return res.status(409).json({ message: `Given ${keyName} is already exist` })
    }
    return res.status(500).json({ message: error });
}

export default errorHandler