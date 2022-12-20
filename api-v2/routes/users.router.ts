// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import User from "../models/user";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs"
import { generateAccessToken, authorize, isAdmin } from "../middlewares/authorization";
const jwt = require("jsonwebtoken")


interface JwtPayload {
    id: string
}


// Global Config
export const userRouter = express.Router();

userRouter.use(express.json());

// UNSECURED

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const newUser = req.body as User;
        if (!newUser.emailAddress || !newUser.password) {
            res.status(409).send("email and password is required")
        }
        if (await collections.users!.findOne({ emailAddress: newUser.emailAddress })) {
            res.status(409).send("user already exists")
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newUser.password, salt);

            const result = await collections.users!.insertOne({
                emailAddress: newUser.emailAddress,
                isAdmin: false,
                password: hashedPassword,
            });

            result
                ? res.status(201).send(`Successfully created a new user with email adress ${newUser.emailAddress}`)
                : res.status(500).send("Failed to create a new user.");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const loginCredentials = req.body as User;
        if (!loginCredentials.emailAddress || !loginCredentials.password) {
            res.status(409).send("email and password is required")
        }
        const user = await collections.users!.findOne({ emailAddress: loginCredentials.emailAddress })
        if (user && await bcrypt.compare(loginCredentials.password, user.password)) {
            res.status(200).send({
                accessToken: generateAccessToken(user._id.toString())
            })
        }
        else { res.status(400).send("Incorrect email or password") }
    } catch (error) {
        res.status(500).send(error);
    }
});


// SECURED
// GET CURRENT USER
userRouter.get("/user/", authorize, async (req: Request, res: Response) => {

    const accessToken = req.headers.authorization!.split(' ')[1];
    const { id } = jwt.verify(accessToken, process.env.JWT_SECRET) as JwtPayload;

    try {
        const query = { "_id": new ObjectId(id) };
        const user = (await collections.users!.findOne(query));

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find current user in database`);
    }
});
//GET ALL USERS
userRouter.get("/", authorize, isAdmin, async (_req: Request, res: Response) => {

    try {
        const users = (await collections.users!.find({}).toArray());
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});
//GET SPECIFIC USER
userRouter.get("/:_id", authorize, isAdmin, async (req: Request, res: Response) => {
    const _id = req?.params?._id;

    try {
        const query = { "_id": new ObjectId(_id) };
        const user = (await collections.users!.findOne(query));

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching user with userId: ${req.params.userId}`);
    }
});

// POST
// ADMIN FUNCTION, CAN CREATE ADMIN
userRouter.post("/", authorize, isAdmin, async (req: Request, res: Response) => {
    try {
        const newUser = req.body as User;
        const result = await collections.users!.insertOne(newUser);

        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});


// PUT
userRouter.put("/:_id", authorize, isAdmin, async (req: Request, res: Response) => {
    const _id = req?.params?._id;

    try {
        const updatedUser: User = req.body as User;
        const query = { "_id": new ObjectId(_id) };

        const result = await collections.users!.updateOne(query, {
            $set: {
                emailAddress: updatedUser.emailAddress,
                isAdmin: updatedUser.isAdmin,
                password: updatedUser.password,
            }
        });

        result
            ? res.status(200).send(`Successfully updated article with articleNumber: ${_id}`)
            : res.status(304).send(`Article with articleNumber: ${_id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// DELETE

userRouter.delete("/:_id", authorize, isAdmin, async (req: Request, res: Response) => {
    const _id = req?.params?._id;

    try {
        const query = { "_id": new ObjectId(_id) };
        const result = await collections.users!.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with userId ${_id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user with userId ${_id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`User with userId ${_id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
