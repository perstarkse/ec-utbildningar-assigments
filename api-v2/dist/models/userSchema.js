"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        emailAddress: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    })
});
// User {
//     constructor(
//         emailAddress: string,
//         isAdmin: boolean,
//         password: string,
//     ) { }
// }
// export const schema = buildSchema(`
// input UserInput { 
//             email: String!
//             password: String!
//             isAdmin: Boolean
// }
// type User {
//             email: String!
//             password: String!
//             isAdmin: Boolean!
//         }
// type Mutation {}
// type Query {
//     users: [User!]!
//     user(id: email): User! 
//     }
// `)
