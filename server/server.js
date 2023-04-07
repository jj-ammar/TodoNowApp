/* Imports  */
const express = require("express");
const cors = require("cors");
const pool = require("./db");
/* App use */
const app = express();
app.use(cors());
app.use(express.json());

/* BUILD UP THE ROUTES */
/*
    ****
    ****
    POST Request 
*/
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

/*
    ****
    ****
    GET Request 
*/

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

/*
    ****
    ****
    GET A SINGLE TODO 
*/

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

/*
    ****
    ****
    Update A SINGLE TODO 
*/

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("TODO TABLE WAS UPDATED");
  } catch (err) {
    console.error(err.message);
  }
});

/*
    ****
    ****
    Update A SINGLE TODO 
*/

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("TODO WAS DELETED");
  } catch (err) {
    console.error(err.message);
  }
});

/* Call the server */
app.listen(5000, () => {
  console.log(`App is listening on port 5000`);
});
