"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         emailAddress: { type: GraphQLString },
//         password: { type: GraphQLString }
//     })
// })
// User {
//     constructor(
//         emailAddress: string,
//         isAdmin: boolean,
//         password: string,
//     ) { }
// }
exports.schema = (0, graphql_1.buildSchema)(`

type User {
            _id: String
            emailAddress: String!
            password: String!
            isAdmin: Boolean!
        }

type Article { 
         _id: String,
         articleNumber: String,
         tag: String,
         name: String,
         description: String,
         category: String,
         price: Int,
         rating: Int,
         imageName: String,
         creator: User,
        }

type Query {
            users: [User]!
            articles: [Article]
            user(_id: ID): User
        }
`);
// input UserInput {
//     email: String!
//     password: String!
//     isAdmin: Boolean
// }
// type Mutation {}
// type Query {
//     users: [User!]!
//     user(id: email): User!
// }
