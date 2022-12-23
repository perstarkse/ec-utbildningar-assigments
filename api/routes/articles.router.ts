// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Article from "../models/articles";
import { authorize, isAdmin } from "../middlewares/authorization";

// Global Config
export const articleRouter = express.Router();

articleRouter.use(express.json());

// GET
// STANDARD FUNCTIONS

articleRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const articles = (await collections.articles!.find({}).toArray());
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

articleRouter.get("/take=:take", async (_req: Request, res: Response) => {
    const take = _req?.params?.take;
    let takeNr = parseInt(take);

    try {
        const articles = (await collections.articles!.find({}, { limit: takeNr }).toArray());
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

articleRouter.get("/id=:articleNumber", async (req: Request, res: Response) => {
    const articleNumber = req?.params?.articleNumber;

    try {
        const query = { articleNumber: articleNumber };
        const article = (await collections.articles!.findOne(query));

        if (article) {
            res.status(200).send(article);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with articleNumber: ${req.params.articleNumber}`);
    }
});


//GET CATEGORIES AND TAGS

articleRouter.get("/latest/:take", async (_req: Request, res: Response) => {
    const take = _req?.params?.take;
    let takeNr = parseInt(take);

    try {
        const articles = (await collections.articles!.find({}, { sort: { _id: -1 }, limit: takeNr }).toArray());
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

articleRouter.get("/mostExpensive/:take", async (_req: Request, res: Response) => {
    const take = _req?.params?.take;
    let takeNr = parseInt(take);

    try {
        const articles = (await collections.articles!.find({}, { sort: { price: -1 }, limit: takeNr }).toArray());
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

articleRouter.get("/topReacted/:take", async (_req: Request, res: Response) => {
    const take = _req?.params?.take;
    let takeNr = parseInt(take);

    try {
        const articles = (await collections.articles!.find({}, { sort: { rating: -1 }, limit: takeNr }).toArray());
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

articleRouter.get("/tag=:tag/:take", async (req: Request, res: Response) => {
    const tag = req?.params?.tag;
    const take = req?.params?.take;
    let takeNr = parseInt(take);

    try {
        const query = { tag: tag };
        const articles = (await collections.articles!.find(query, { limit: takeNr }).toArray());
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

articleRouter.get("/cat=:category/:take", async (_req: Request, res: Response) => {
    const category = _req?.params?.category;
    const take = _req?.params?.take;
    let takeNr = parseInt(take);

    try {
        const query = { category: category };
        const article = (await collections.articles!.find(query, { limit: takeNr }).toArray());;
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});


// POST

articleRouter.post("/", authorize, isAdmin, async (req: Request, res: Response) => {
    try {

        const newArticle = req.body as Article;

        if (!newArticle.articleNumber) {
            res.status(400).send("requries an articleNumber")
        }
        if (await collections.articles!.findOne({ articleNumber: newArticle.articleNumber })) {
            res.status(409).send("Failed, product must have unique articleNumber");
        }
        else {
            const result = await collections.articles!.insertOne(newArticle);
            result
                ? res.status(201).send(`Successfully created a new article with id ${result.insertedId}`)
                : res.status(500).send("Failed to create a new article.");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


// PUT
articleRouter.put("/id=:articleNumber", authorize, isAdmin, async (req: Request, res: Response) => {
    const articleNumber = req?.params?.articleNumber;

    try {
        const updatedArticle: Article = req.body as Article;
        const query = { articleNumber: articleNumber };

        const result = await collections.articles!.updateOne(query, {
            $set: {
                articleNumber: updatedArticle.articleNumber,
                tag: updatedArticle.tag,
                name: updatedArticle.name,
                description: updatedArticle.description,
                category: updatedArticle.category,
                price: updatedArticle.price,
                rating: updatedArticle.rating,
                imageName: updatedArticle.imageName,
            }
        });

        result
            ? res.status(200).send(`Successfully updated article with articleNumber: ${articleNumber}`)
            : res.status(304).send(`Article with articleNumber: ${articleNumber} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// DELETE

articleRouter.delete("/id=:articleNumber", authorize, isAdmin, async (req: Request, res: Response) => {
    const articleNumber = req?.params?.articleNumber;

    try {
        const query = { articleNumber: articleNumber };
        const result = await collections.articles!.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(200).send(`Successfully removed article with articleNumber ${articleNumber}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove article with articleNumber ${articleNumber}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Article with articleNumber ${articleNumber} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});