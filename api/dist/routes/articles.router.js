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
exports.articleRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
const authorization_1 = require("../middlewares/authorization");
// Global Config
exports.articleRouter = express_1.default.Router();
exports.articleRouter.use(express_1.default.json());
// GET
// STANDARD FUNCTIONS
exports.articleRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = (yield database_service_1.collections.articles.find({}).toArray());
        res.status(200).send(articles);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.articleRouter.get("/take=:take", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const take = (_a = _req === null || _req === void 0 ? void 0 : _req.params) === null || _a === void 0 ? void 0 : _a.take;
    let takeNr = parseInt(take);
    try {
        const articles = (yield database_service_1.collections.articles.find({}, { limit: takeNr }).toArray());
        res.status(200).send(articles);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.articleRouter.get("/id=:articleNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const articleNumber = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.articleNumber;
    try {
        const query = { articleNumber: articleNumber };
        const article = (yield database_service_1.collections.articles.findOne(query));
        if (article) {
            res.status(200).send(article);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with articleNumber: ${req.params.articleNumber}`);
    }
}));
//GET CATEGORIES AND TAGS
exports.articleRouter.get("/latest/:take", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const take = (_c = _req === null || _req === void 0 ? void 0 : _req.params) === null || _c === void 0 ? void 0 : _c.take;
    let takeNr = parseInt(take);
    try {
        const articles = (yield database_service_1.collections.articles.find({}, { sort: { _id: -1 }, limit: takeNr }).toArray());
        res.status(200).send(articles);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.articleRouter.get("/mostExpensive/:take", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const take = (_d = _req === null || _req === void 0 ? void 0 : _req.params) === null || _d === void 0 ? void 0 : _d.take;
    let takeNr = parseInt(take);
    try {
        const articles = (yield database_service_1.collections.articles.find({}, { sort: { price: -1 }, limit: takeNr }).toArray());
        res.status(200).send(articles);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.articleRouter.get("/topReacted/:take", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const take = (_e = _req === null || _req === void 0 ? void 0 : _req.params) === null || _e === void 0 ? void 0 : _e.take;
    let takeNr = parseInt(take);
    try {
        const articles = (yield database_service_1.collections.articles.find({}, { sort: { rating: -1 }, limit: takeNr }).toArray());
        res.status(200).send(articles);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.articleRouter.get("/tag=:tag/:take", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const tag = (_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.tag;
    const take = (_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.take;
    let takeNr = parseInt(take);
    try {
        const query = { tag: tag };
        const articles = (yield database_service_1.collections.articles.find(query, { limit: takeNr }).toArray());
        res.status(200).send(articles);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.articleRouter.get("/cat=:category/:take", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    const category = (_h = _req === null || _req === void 0 ? void 0 : _req.params) === null || _h === void 0 ? void 0 : _h.category;
    const take = (_j = _req === null || _req === void 0 ? void 0 : _req.params) === null || _j === void 0 ? void 0 : _j.take;
    let takeNr = parseInt(take);
    try {
        const query = { category: category };
        const article = (yield database_service_1.collections.articles.find(query, { limit: takeNr }).toArray());
        ;
        res.status(200).send(article);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// POST
exports.articleRouter.post("/", authorization_1.authorize, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newArticle = req.body;
        if (!newArticle.articleNumber) {
            res.status(400).send("requries an articleNumber");
        }
        if (yield database_service_1.collections.articles.findOne({ articleNumber: newArticle.articleNumber })) {
            res.status(409).send("Failed, product must have unique articleNumber");
        }
        else {
            const result = yield database_service_1.collections.articles.insertOne(newArticle);
            result
                ? res.status(201).send(`Successfully created a new article with id ${result.insertedId}`)
                : res.status(500).send("Failed to create a new article.");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// PUT
exports.articleRouter.put("/id=:articleNumber", authorization_1.authorize, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const articleNumber = (_k = req === null || req === void 0 ? void 0 : req.params) === null || _k === void 0 ? void 0 : _k.articleNumber;
    try {
        const updatedArticle = req.body;
        const query = { articleNumber: articleNumber };
        const result = yield database_service_1.collections.articles.updateOne(query, {
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
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
// DELETE
exports.articleRouter.delete("/id=:articleNumber", authorization_1.authorize, authorization_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    const articleNumber = (_l = req === null || req === void 0 ? void 0 : req.params) === null || _l === void 0 ? void 0 : _l.articleNumber;
    try {
        const query = { articleNumber: articleNumber };
        const result = yield database_service_1.collections.articles.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(200).send(`Successfully removed article with articleNumber ${articleNumber}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove article with articleNumber ${articleNumber}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Article with articleNumber ${articleNumber} does not exist`);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}));
