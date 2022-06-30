const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {

    const uri = process.env.LOGIN;

    const client = new MongoClient(uri);
    try {
        await client.connect();

        //await creategames(client, {
        //    game: "Leauge of Legends",
        //    likes: 14,
        //    dislike: 141
        //})

        //await findOneListingByName(client, "Rocket League");

        await updateListingByName(client, "Fortnite", { likes: 70 });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function updateListingByName(client, name, likes, dislikes) {
    const result = await client.db("pollsystem").collection("games").updateOne({ game: name }, { $set: { likes: likes } });

    if (result) {
        console.log(`Updated game with the following name: ${name}`);
    } else {
        console.log(`No game found with the name: ${name}`);
    }
}

//async function findOneListingByName(client, name) {
//    const result = await client.db("pollsystem").collection("games").findOne({ game: name });
//
//    if (result) {
//        console.log(`Found game with the following name: ${name}`);
//        console.log(result);
//    } else {
//        console.log(`No game found with the name: ${name}`);
//    }
//}

//async function creategames(client, newgame) {
//    const result = await client.db("pollsystem").collection("games").insertOne(newgame);
//
//    console.log(`Inserted game with the following id: ${result.insertedId}`);
//}

//async function listDatabases(client) {
//    const databasesList = await client.db().admin().listDatabases();
//
//    console.log("Databases:");
//    databasesList.databases.forEach(db => {
//        console.log(` - ${db.name}`);
//    })
//}


//object.onload = function(){myScript};