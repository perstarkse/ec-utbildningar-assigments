// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { articles?: mongoDB.Collection, users?: mongoDB.Collection } = {}

// Initialize Connection

export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    // Add server side validation for articleCollection as well?

    await db.command({
        "collMod": process.env.COLLECTION_NAME_USERS,
        "validator": {
            $jsonSchema: {
                bsonType: "object",
                required: ["emailAddress", "isAdmin", "password"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    emailAddress: {
                        bsonType: "string",
                        description: "'emailAddress' is required and is a string"
                    },
                    isAdmin: {
                        bsonType: "bool",
                        description: "'isAdmin' is required and is a boolean"
                    },
                    password: {
                        bsonType: "string",
                        description: "'password' is required and is a string"
                    }
                }
            }
        }
    });

    const articleCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME_PRODUCTS!);
    const userCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME_USERS!);

    collections.articles = articleCollection;
    collections.users = userCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${articleCollection.collectionName}`);
}