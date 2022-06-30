require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const port = 8080;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    let ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr) {
        const list = ipAddr.split(",");
        ipAddr = list[list.length - 1];
    } else {
        ipAddr = req.connection.remoteAddress;
    }
    res.send(ipAddr);
});

async function main() {

    const uri = process.env.LOGIN;

    const client = new MongoClient(uri);
    try {
        await client.connect();


        await creategames(client, {
            game: "Leauge of Legends",
            likes: 0,
            dislike: 0,
            ip: ipAddr
        })


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function creategames(client, newgame) {
    const result = await client.db("pollsystem").collection("games").insertOne(newgame);

    console.log(`Inserted game with the following id: ${result.insertedId}`);
}

app.listen(process.env.PORT, () => {
    console.log("Server kaya is gayy");
});
