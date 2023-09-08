const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

// to parse the body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// to use method override
app.use(methodOverride("_method"));

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

// add a new todo
app.get("/todo/add", (req, res) => {
	res.render("todo/add");
});

// show details of task
app.get("/todo/:id", (req, res) => {
	const { id } = req.params;
	const currentTask = todo.find((t) => t.id === id);
	res.render("todo/details", { currentTask });
});

// form to edit details of a task
app.get("/todo/:id/edit", (req, res) => {
	const { id } = req.params;
	const currentTask = todo.find((t) => t.id === id);
	res.render("todo/edit", { currentTask });
});

// to update the details
app.patch("/todo/:id", (req, res) => {
	const { id } = req.params;
	const updatedTask = req.body.task;
	const updatedDescription = req.body.description;
	const currentTask = todo.find((t) => t.id === id);
	currentTask.task = updatedTask;
	currentTask.description = updatedDescription;
	res.redirect("/todo");
});

app.delete("/todo/:id", (req, res) => {
	const { id } = req.params;
	// loop through array, and put into new array where todo.id is not equal to the id in the path
	todo = todo.filter((t) => t.id !== id);
	res.redirect("/todo");
});

// form to add new todo
app.post("/todo", (req, res) => {
	// console.log(req.body);
	const { task, description } = req.body;
	todo.push({ task, description, id: uuid() });
	res.redirect("/todo");
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
