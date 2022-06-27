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

app.listen(3000, () => {
    console.log("Server is poep");
});
