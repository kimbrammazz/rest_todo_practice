const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");

// to parse the body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Our fake database:
let todo = [
	{
		id: uuid(),
		task: "Buy wedding gift",
		description: "Crystal bowl from Myer",
	},
	{
		id: uuid(),
		task: "Renew passport",
		description: "Fill in online application and make appointment",
	},
];

// Routes to configure
// 	/todo - GET - display all todos
// 	/todo/add - GET - form to create new todo
// 	/todo - POST - creates new todo on 'server'
// 	/todo/:id - GET - details for one specific todo
// 	/todo/:id/edit - GET - form to edit one specific todo
// 	/todo/:id - PATCH - updates specific todo on "server"
// 	/todo/:id - DELETE - deletes specific todo on "server"

//display all todos
app.get("/todo", (req, res) => {
	res.render("todo/index", { todo });
});

app.get("/todo/add", (req, res) => {
	res.render("todo/add");
});

app.post("/todo", (req, res) => {
	// console.log(req.body);
	const { task, description } = req.body;
	todo.push({ task, description, id: uuid() });
	res.redirect("/todo");
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
