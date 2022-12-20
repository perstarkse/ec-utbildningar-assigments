"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleType = exports.UserType = void 0;
const graphql_1 = require("graphql");
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        emailAddress: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        // products: {
        //     type: new GraphQLList(ArticleType),
        //     resolve: (parent, args) => { collections.articles?.find({ "user": parent._id }) }
        // }
    })
});
exports.ArticleType = new graphql_1.GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        articleNumber: { type: graphql_1.GraphQLString },
        tag: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        category: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLString },
        rating: { type: graphql_1.GraphQLString },
        imageName: { type: graphql_1.GraphQLString },
        user: {
            type: exports.UserType,
            resolve: (parent, args) => {
                var _a;
                return (_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.findOne({ "_id": new mongodb_1.ObjectId(parent._id) });
            }
        }
    })
});
