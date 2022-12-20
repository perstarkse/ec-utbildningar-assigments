"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleType = void 0;
const graphql_1 = require("graphql");
// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: {
//         _id: { type: GraphQLID },
//         emailAddress: { type: GraphQLString },
//         password: { type: GraphQLString },
//         isAdmin: { type: GraphQLBoolean }
//         // products: {
//         //     type: new GraphQLList(ArticleType),
//         //     resolve: (parent, args) => { collections.articles?.find({ "user": parent._id }) }
//         // }
//     }
// });
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
        // user: {
        //     type: UserType,
        //     resolve: (parent, args) => {
        //         return collections.users?.findOne({ "_id": new ObjectId(parent._id) })
        //     }
        // }
    })
});
