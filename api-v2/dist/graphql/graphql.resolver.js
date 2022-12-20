"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolver = void 0;
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.resolver = {
    users: () => {
        return database_service_1.collections.users.find({}).toArray();
    },
    user: (args) => {
        const query = { "_id": new mongodb_1.ObjectId(args._id) };
        const user = (database_service_1.collections.users.findOne(query));
        return user;
    },
    articles: () => {
        return database_service_1.collections.articles.find({}).toArray();
    }
};
