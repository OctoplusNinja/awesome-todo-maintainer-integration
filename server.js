require("dotenv").config();
const { readTodo, createTodo, deleteTodo, dev, status } = require("./app");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/", async (req, res) => {
    const result = await status(req.query.databaseID);
    res.send(result);
});

app.get("/readTodo", async (req, res) => {
    const todos = await readTodo(req.query.databaseID);
    res.send(todos);
});

app.post('/createTodo', async (req, res) => {
    const result = await createTodo(req.query.databaseID, req.body);
    res.send(result);
})

app.get('/dev', async (req, res) => {
    const result = await dev(req.query.databaseID);
    res.send(result);
})

app.delete('/deleteTodo', async (req, res) => {
    const result = await deleteTodo(req.body.pageID);
    res.send(result);
})

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
