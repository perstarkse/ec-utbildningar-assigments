"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolver = void 0;
const database_service_1 = require("../services/database.service");
exports.resolver = {
    // Queries
    // get all posts
    users: () => {
        return database_service_1.collections.users.find({}).toArray();
    },
    articles: () => {
        return database_service_1.collections.articles.find({}).toArray();
    }
};
