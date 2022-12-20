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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
const mongodb_1 = require("mongodb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authorization_1 = require("../middlewares/authorization");
const jwt = require("jsonwebtoken");
// Global Config
exports.userRouter = express_1.default.Router();
exports.userRouter.use(express_1.default.json());
// UNSECURED
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        if (!newUser.emailAddress || !newUser.password) {
            res.status(409).send("email and password is required");
        }
        if (yield database_service_1.collections.users.findOne({ emailAddress: newUser.emailAddress })) {
            res.status(409).send("user already exists");
        }
        else {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(newUser.password, salt);
            const result = yield database_service_1.collections.users.insertOne({
                emailAddress: newUser.emailAddress,
                isAdmin: false,
                password: hashedPassword,
            });
            result
                ? res.status(201).send(`Successfully created a new user with email adress ${newUser.emailAddress}`)
                : res.status(500).send("Failed to create a new user.");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginCredentials = req.body;
        if (!loginCredentials.emailAddress || !loginCredentials.password) {
            res.status(409).send("email and password is required");
        }
        const user = yield database_service_1.collections.users.findOne({ emailAddress: loginCredentials.emailAddress });
        if (user && (yield bcryptjs_1.default.compare(loginCredentials.password, user.password))) {
            res.status(200).send({
                accessToken: (0, authorization_1.generateAccessToken)(user._id.toString())
            });
        }
        else {
            res.status(400).send("Incorrect email or password");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// SECURED
// GET CURRENT USER
exports.userRouter.get("/user/", authorization_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { id } = jwt.verify(accessToken, process.env.JWT_SECRET);
    try {
        const query = { "_id": new mongodb_1.ObjectId(id) };
        const user = (yield database_service_1.collections.users.findOne(query));
        if (user) {
            res.status(200).send(user);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find current user in database`);
    }
}));
//GET ALL USERS
exports.userRouter.get("/", authorization_1.authorize, authorization_1.isAdmin, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = (yield database_service_1.collections.users.find({}).toArray());
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
//GET SPECIFIC USER
exports.userRouter.get("/:_id", authorization_1.authorize, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const query = { "_id": new mongodb_1.ObjectId(_id) };
        const user = (yield database_service_1.collections.users.findOne(query));
        if (user) {
            res.status(200).send(user);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching user with userId: ${req.params.userId}`);
    }
}));
// POST
// ADMIN FUNCTION, CAN CREATE ADMIN
exports.userRouter.post("/", authorization_1.authorize, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const result = yield database_service_1.collections.users.insertOne(newUser);
        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
// PUT
exports.userRouter.put("/:_id", authorization_1.authorize, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const _id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b._id;
    try {
        const updatedUser = req.body;
        const query = { "_id": new mongodb_1.ObjectId(_id) };
        const result = yield database_service_1.collections.users.updateOne(query, {
            $set: {
                emailAddress: updatedUser.emailAddress,
                isAdmin: updatedUser.isAdmin,
                password: updatedUser.password,
            }
        });
        result
            ? res.status(200).send(`Successfully updated article with articleNumber: ${_id}`)
            : res.status(304).send(`Article with articleNumber: ${_id} not updated`);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
// DELETE
exports.userRouter.delete("/:_id", authorization_1.authorize, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const _id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c._id;
    try {
        const query = { "_id": new mongodb_1.ObjectId(_id) };
        const result = yield database_service_1.collections.users.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with userId ${_id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove user with userId ${_id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`User with userId ${_id} does not exist`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
