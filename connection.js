const { MongoClient } = require('mongodb');

async function main() {
    const uri = process.env.LOGIN;

    const client = new MongoClient("mongodb+srv://Dark045:BJmPmVymcsjswmSE@cluster0.mik6k.mongodb.net/?retryWrites=true&w=majority");
    try {
        await client.connect();

        await creategames(client, {
            game: "fortnite",
            likes: 0,
            dislikes: 0
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function creategames(client, newgame) {
    const result = await client.db("pollsystem").collection("games").insertOne(newgame);

    console.log(`Inserted game with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    })
}