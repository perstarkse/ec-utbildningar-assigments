import { buildSchema, GraphQLObjectType, graphql, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLSchema, GraphQLInt } from 'graphql'
import { ObjectId } from 'mongodb'
import { collections } from '../services/database.service'

const UserType: any = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        password: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean },
        products: {
            type: new GraphQLList(ArticleType),
            resolve: (parent, args) => { collections.articles?.find({ "user": parent._id }) }
        }
    })
});


const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        _id: { type: GraphQLID },
        articleNumber: { type: GraphQLString },
        tag: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        price: { type: GraphQLInt },
        rating: { type: GraphQLInt },
        imageName: { type: GraphQLString },
        user: {
            type: UserType,
            resolve: (parent, args) => {
                return collections.users?.findOne({ "_id": new ObjectId(parent._id) })
            }
        }
    })
})

export const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //UserType implementation, not enabled
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
            args: { articleNumber: { type: GraphQLString } },
            resolve(parent, args) {
                return collections.articles!.findOne({ articleNumber: args.articleNumber })
            }
        },
        articles: {
            type: new GraphQLList(ArticleType),
            resolve: (parent, args) => {
                return collections.articles!.find({}).toArray()
            }
        },
        tagArticles: {
            type: new GraphQLList(ArticleType),
            args: {
                tag: { type: GraphQLString },
                take: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return collections.articles!.find({ tag: args.tag }, { limit: args.take }).toArray()
            }
        },
        categoryArticles: {
            type: new GraphQLList(ArticleType),
            args: {
                category: { type: GraphQLString },
                take: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return collections.articles!.find({ category: args.category }, { limit: args.take }).toArray()
            }
        },
        latestArticles: {
            type: new GraphQLList(ArticleType),
            args: {
                take: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return collections.articles!.find({}, { sort: { _id: -1 }, limit: args.take }).toArray()
            }
        },
        mostExpensive: {
            type: new GraphQLList(ArticleType),
            args: {
                take: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return collections.articles!.find({}, { sort: { price: -1 }, limit: args.take }).toArray()
            }
        },
        topReacted: {
            type: new GraphQLList(ArticleType),
            args: {
                take: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return collections.articles!.find({}, { sort: { rating: -1 }, limit: args.take }).toArray()
            }
        },
    }
})

export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addArticle: {
            type: ArticleType,
            args: {
                articleNumber: { type: GraphQLString },
                tag: { type: GraphQLString },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
                price: { type: GraphQLInt },
                rating: { type: GraphQLInt },
                imageName: { type: GraphQLString },
                user: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                let result = await collections.articles!.insertOne({
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
                return collections.articles!.findOne({ "_id": result.insertedId })
            }
        },
        editArticle: {
            type: ArticleType,
            args: {
                articleNumber: { type: GraphQLString },
                tag: { type: GraphQLString },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                category: { type: GraphQLString },
                price: { type: GraphQLString },
                rating: { type: GraphQLString },
                imageName: { type: GraphQLString },
                user: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                collections.articles!.updateOne({ articleNumber: args.articleNumber }, {
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
                return collections.articles!.findOne({ articleNumber: args.articleNumber })
            }
        },
        deleteArticle: {
            type: ArticleType,
            args: {
                articleNumber: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                collections.articles?.deleteOne({ articleNumber: args.articleNumber })
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
}
)

export const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})