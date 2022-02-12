require("dotenv").config();
const readTodo = require("./app");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Bruhhhh");
});

app.get("/readTodo", async (req, res) => {
    const todos = await readTodo();
    // console.log(todos);
    res.send(todos);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
