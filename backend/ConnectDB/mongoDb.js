import env from 'dotenv'
import { MongoClient } from "mongodb";

const Uri = process.env.MONGO_URI;

const client = new MongoClient(Uri);

async function connectToMongo() {
    try {
        await client.connect();
        const db = client.db("test1");
        console.log("Connect to MongoDB ...");
        return db;
    } catch (error) {
        console.error(error);
    }
}

export const db = await connectToMongo();