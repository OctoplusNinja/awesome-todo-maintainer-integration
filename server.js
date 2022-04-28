const {
	readTodo,
	createTodo,
	deleteTodo,
	updateTodo,
	dev,
	status,
} = require('./app');
const auth = require('./middleware/auth');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(auth);

app.get('/', async (req, res) => {
	const result = await status(res.locals.client, req.query.databaseID);
	res.send(result);
});

app.post('/createTodo', async (req, res) => {
	const result = await createTodo(
		res.locals.client,
		req.query.databaseID,
		req.body,
	);
	res.send(result);
});

app.get('/readTodo', async (req, res) => {
	const result = await readTodo(res.locals.client, req.query.databaseID);
	res.send(result);
});

app.post('/updateTodo', async (req, res) => {
	const result = await updateTodo(res.locals.client, req.body);
	res.send(result);
});

app.post('/deleteTodo', async (req, res) => {
	const result = await deleteTodo(res.locals.client, req.body.pageID);
	res.send(result);
});

app.get('/dev', async (req, res) => {
	const result = await dev(res.locals.client, req.query.databaseID);
	res.send(result);
});
app.listen(port, () => {
	console.log(`Server Listening on port ${port}`);
});
