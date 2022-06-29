require('dotenv').config();
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

app.listen(process.env.PORT, () => {
    console.log("Server kaya is gayy");
});
