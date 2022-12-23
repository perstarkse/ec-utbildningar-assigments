const jwt = require("jsonwebtoken")
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";

interface JwtPayload {
    id: string
}

export const generateAccessToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_SECRET);
            next()
        }
        catch {
            res.status(401).send('authorization error ')
        }
    }
    else { res.status(401).send('must have accessToken') }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(accessToken, process.env.JWT_SECRET) as JwtPayload;

            const query = { "_id": new ObjectId(id) };
            const user = (await collections.users!.findOne(query));
            if (user!.isAdmin == true) {
                next()
            }
            else {
                res.status(401).send('error, user is not admin');
            }
        }
        catch {
            res.status(401).send('error isAdmin')
        }
    }
    else { res.status(401).send('must have accessToken') }
}