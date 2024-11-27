const { MongoClient } = require('mongodb');
require("dotenv").config()

async function getWinstar() {
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
   

    const database = client.db("test");
    const collection = database.collection("log");

    
    const documents = await collection.find({}).toArray();
    console.log(documents);
 
    
  }catch{
    await client.close();
    
  }
}


getWinstar

