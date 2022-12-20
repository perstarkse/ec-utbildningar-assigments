"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authorize = exports.generateAccessToken = void 0;
const jwt = require("jsonwebtoken");
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};
exports.generateAccessToken = generateAccessToken;
const authorize = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_SECRET);
            next();
        }
        catch (_a) {
            res.status(401).send('authorization error ');
        }
    }
    else {
        res.status(401).send('must have accessToken');
    }
};
exports.authorize = authorize;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(accessToken, process.env.JWT_SECRET);
            const query = { "_id": new mongodb_1.ObjectId(id) };
            const user = (yield database_service_1.collections.users.findOne(query));
            if (user.isAdmin == true) {
                next();
            }
            else {
                res.status(401).send('error, user is not admin');
            }
        }
        catch (_a) {
            res.status(401).send('error isAdmin');
        }
    }
    else {
        res.status(401).send('must have accessToken');
    }
});
exports.isAdmin = isAdmin;
