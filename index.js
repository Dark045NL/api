require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connection, createGames, findAllGames, updateListingByName, findOneListingByName } = require('./connection');

var corsOptions = {
    origin: '*',
  };
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

let client;
(async () => {
    client = await connection();
})();

app.use(async (req, res, next) => {
    req.db = client;
    next();
});

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

//get all games
app.get("/games", async (req, res) => {
    try {
        const games = await findAllGames(req.db);
        res.json(games);
    } catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
});

//create new game on db
app.post("/games", async (req, res) => {
    //put here restrictions about name
    if (req.body && req.body.name) {
        try {
            const game = await createGames(req.db, { name: req.body.name, likes: 0, dislikes: 0, voterIps: [] });
            res.json(game);
        } catch (e) {
            console.error(e);
            res.sendStatus(400);
        }

    } else {
        res.sendStatus(400);
    }
});

//update game votes
app.put("/games", async (req, res) => {
    if (req.body && req.body.name && req.body.likes && req.body.dislikes) {
        try {
            const checkIp = await findOneListingByName(req.db, req.body.name);
            let ipAddr = req.headers["x-forwarded-for"];
            if (ipAddr) {
                const list = ipAddr.split(",");
                ipAddr = list[list.length - 1];
            } else {
                ipAddr = req.connection.remoteAddress;
            }
            if (checkIp.voterIps.includes(ipAddr)) {
                res.sendStatus(401);
                return;
            } else {
                const game = await updateListingByName(req.db, req.body.name, req.body.likes, req.body.dislikes, [...checkIp.voterIps, ipAddr]);
                res.json(game);
            }
        } catch(e) {
            console.error(e);
            res.sendStatus(400);
        }
    }
});


app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
