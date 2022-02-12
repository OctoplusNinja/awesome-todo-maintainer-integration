require("dotenv").config();
const { readTodo, dev } = require("./app");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const devPORT = 6969;

app.get("/", (req, res) => {
    res.send("Bruhhhh");
});

app.get("/readTodo", async (req, res) => {
    const todos = await readTodo();
    // console.log(todos);
    res.send(todos);
});

app.get('/dev', async (req, res) => {
    const result = await dev();
    res.send(result);
})

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
