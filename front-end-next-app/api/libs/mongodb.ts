import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DATABASE_URL;
if (!uri) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

let connection: MongoClient;

const client: MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function MongooDBConn() {
  return await client.connect();
}

export default MongooDBConn;
