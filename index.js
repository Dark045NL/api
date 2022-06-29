require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const port = 8080;
const app = express();
app.use(express.json());

mongoose.connect(
    process.env.LOGIN,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
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


app.listen(process.env.PORT, () => {
    console.log("Server is kaya is gayy");
});
