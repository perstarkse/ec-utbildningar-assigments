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
exports.graphqlSchema = exports.Mutation = exports.RootQuery = void 0;
const graphql_1 = require("graphql");
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: graphql_1.GraphQLString },
        emailAddress: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        isAdmin: { type: graphql_1.GraphQLBoolean },
        products: {
            type: new graphql_1.GraphQLList(ArticleType),
            resolve: (parent, args) => { var _a; (_a = database_service_1.collections.articles) === null || _a === void 0 ? void 0 : _a.find({ "user": parent._id }); }
        }
    })
});
const ArticleType = new graphql_1.GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        articleNumber: { type: graphql_1.GraphQLString },
        tag: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        category: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        rating: { type: graphql_1.GraphQLInt },
        imageName: { type: graphql_1.GraphQLString },
        user: {
            type: UserType,
            resolve: (parent, args) => {
                var _a;
                return (_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.findOne({ "_id": new mongodb_1.ObjectId(parent._id) });
            }
        }
    })
});
exports.RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // user: {
        //     type: UserType,
        //     args: { _id: { type: GraphQLID } },
        //     resolve: (parent, args) => {
        //         return collections.users!.findOne({ "_id": new ObjectId(args._id) })
        //     }
        // },
        // users: {
        //     type: new GraphQLList(UserType),
        //     resolve: async (parent) => {
        //         return collections.users!.find({}).toArray();
        //     }
        // },
        article: {
            type: ArticleType,
            args: { articleNumber: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                return database_service_1.collections.articles.findOne({ articleNumber: args.articleNumber });
            }
        },
        articles: {
            type: new graphql_1.GraphQLList(ArticleType),
            resolve: (parent, args) => {
                return database_service_1.collections.articles.find({}).toArray();
            }
        },
        tagArticles: {
            type: new graphql_1.GraphQLList(ArticleType),
            args: {
                tag: { type: graphql_1.GraphQLString },
                take: { type: graphql_1.GraphQLInt }
            },
            resolve: (parent, args) => {
                return database_service_1.collections.articles.find({ tag: args.tag }, { limit: args.take }).toArray();
            }
        },
        categoryArticles: {
            type: new graphql_1.GraphQLList(ArticleType),
            args: {
                category: { type: graphql_1.GraphQLString },
                take: { type: graphql_1.GraphQLInt }
            },
            resolve: (parent, args) => {
                return database_service_1.collections.articles.find({ category: args.category }, { limit: args.take }).toArray();
            }
        },
        latestArticles: {
            type: new graphql_1.GraphQLList(ArticleType),
            args: {
                take: { type: graphql_1.GraphQLInt }
            },
            resolve: (parent, args) => {
                return database_service_1.collections.articles.find({}, { sort: { _id: -1 }, limit: args.take }).toArray();
            }
        },
        mostExpensive: {
            type: new graphql_1.GraphQLList(ArticleType),
            args: {
                take: { type: graphql_1.GraphQLInt }
            },
            resolve: (parent, args) => {
                return database_service_1.collections.articles.find({}, { sort: { price: -1 }, limit: args.take }).toArray();
            }
        },
        topReacted: {
            type: new graphql_1.GraphQLList(ArticleType),
            args: {
                take: { type: graphql_1.GraphQLInt }
            },
            resolve: (parent, args) => {
                return database_service_1.collections.articles.find({}, { sort: { rating: -1 }, limit: args.take }).toArray();
            }
        },
    }
});
exports.Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addArticle: {
            type: ArticleType,
            args: {
                articleNumber: { type: graphql_1.GraphQLString },
                tag: { type: graphql_1.GraphQLString },
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                category: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt },
                rating: { type: graphql_1.GraphQLInt },
                imageName: { type: graphql_1.GraphQLString },
                user: { type: graphql_1.GraphQLString }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield database_service_1.collections.articles.insertOne({
                    articleNumber: args.articleNumber,
                    tag: args.tag,
                    name: args.name,
                    description: args.description,
                    category: args.category,
                    price: args.price,
                    rating: args.rating,
                    imageName: args.imageName,
                    user: args.user,
                });
                return database_service_1.collections.articles.findOne({ "_id": result.insertedId });
            })
        },
        editArticle: {
            type: ArticleType,
            args: {
                articleNumber: { type: graphql_1.GraphQLString },
                tag: { type: graphql_1.GraphQLString },
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                category: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLString },
                rating: { type: graphql_1.GraphQLString },
                imageName: { type: graphql_1.GraphQLString },
                user: { type: graphql_1.GraphQLString }
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                database_service_1.collections.articles.updateOne({ articleNumber: args.articleNumber }, {
                    $set: {
                        articleNumber: args.articleNumber,
                        tag: args.tag,
                        name: args.name,
                        description: args.description,
                        category: args.category,
                        price: args.price,
                        rating: args.rating,
                        imageName: args.imageName,
                        user: args.user,
                    }
                });
                return database_service_1.collections.articles.findOne({ articleNumber: args.articleNumber });
            })
        },
        deleteArticle: {
            type: ArticleType,
            args: {
                articleNumber: { type: graphql_1.GraphQLString },
            },
            resolve: (parent, args) => {
                var _a;
                (_a = database_service_1.collections.articles) === null || _a === void 0 ? void 0 : _a.deleteOne({ articleNumber: args.articleNumber });
            }
        },
        /// CRUD FOR USERS
        // addUser: {
        //     type: UserType,
        //     args: {
        //         emailAddress: { type: GraphQLString },
        //         isAdmin: { type: GraphQLBoolean },
        //         password: { type: GraphQLString }
        //     },
        //     resolve: async (parent, args) => {
        //         let result = await collections.users!.insertOne({
        //             emailAddress: args.emailAddress,
        //             isAdmin: args.isAdmin,
        //             password: args.password,
        //         });
        //         return collections.users!.findOne({ "_id": result.insertedId })
        //     }
        // },
        // editUser: {
        //     type: UserType,
        //     args: {
        //         _id: { type: GraphQLID },
        //         emailAddress: { type: GraphQLString },
        //         isAdmin: { type: GraphQLBoolean },
        //         password: { type: GraphQLString }
        //     },
        //     resolve: async (parent, args) => {
        //         collections.users!.updateOne({
        //             "_id": new ObjectId(args._id)
        //         }, {
        //             $set: {
        //                 emailAddress: args.emailAddress,
        //                 isAdmin: args.isAdmin,
        //                 password: args.password,
        //             }
        //         });
        //         return collections.users!.findOne({ "_id": new ObjectId(args._id) })
        //     }
        // }
    }
});
exports.graphqlSchema = new graphql_1.GraphQLSchema({
    query: exports.RootQuery,
    mutation: exports.Mutation
});
