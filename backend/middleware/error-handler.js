import express from 'express';
import { getErrorMessage } from '../utils/err.js';
import dotenv from 'dotenv';

dotenv.config();

export const errorHandler = (err, req, res, next) => {
    if (res.headersSent || process.env.debug) {
        next(err); //default error handler
        return;
    }

    res.status(500).json({ error: {
        message: getErrorMessage(err) || "An error occurred. Please view logs for more details"
    } });
}