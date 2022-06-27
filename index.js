const express = require('express');
const mongoose = require("mongoose");
const Router = require("./routes")
const port = 8080;
const app = express();
const username = "<Dark045>";
const password = "<STEluckytje2@>";
const cluster = "<Cluster0>";
const dbname = "api";

app.use(express.json());

mongoose.connect(
    'mongodb+srv://Dark045:<password>@cluster0.mik6k.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});