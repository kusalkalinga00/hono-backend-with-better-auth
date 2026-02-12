import { Hono } from "hono";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  insertTodo,
  getTodosByUserId,
  updateTodo,
  deleteTodo,
} from "@/queries";
import { HonoEnv } from "@/types";
import { createTodoValidator } from "@/validators/todo.validator";

export const todos = new Hono<HonoEnv>();

todos.use(authMiddleware);

// get all todos for a user
todos.get("/", async (c) => {
  const user = c.get("user");

  try {
    const result = await getTodosByUserId(user.id);
    return c.json(result);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

// create a new todo
todos.post("/", createTodoValidator, async (c) => {
  const user = c.get("user");
  const todoData = c.req.valid("json");

  try {
    const newTodo = await insertTodo({
      ...todoData,
      userId: user.id,
    });

    return c.json(newTodo, 201);
  } catch (error) {
    console.error("Error creating todo:", error);
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

// update a todo
todos.put("/:id", async (c) => {
  const { id } = c.req.param();
  const updateData = c.req.json();

  try {
    const updatedTodo = await updateTodo(id, await updateData);
    return c.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return c.json({ error: "Failed to update todo" }, 500);
  }
});

// delete a todo
todos.delete("/:id", async (c) => {
  const { id } = c.req.param();

  try {
    await deleteTodo(id);
    return c.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return c.json({ error: "Failed to delete todo" }, 500);
  }
});
