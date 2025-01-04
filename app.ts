require('dotenv').config();
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
export const app = express()
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ErrorMiddleware from './middleware/error';
import userRouter from './routes/user.route';





app.use(express.json({ limit: '50mb' }))

app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN,
}))

//registration
app.use('/api/v1', userRouter);

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is working'
    })
})


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})

// Error handling middleware - should be last
app.use(ErrorMiddleware);

export default app;