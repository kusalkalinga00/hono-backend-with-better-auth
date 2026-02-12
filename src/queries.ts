import { db } from "@/db/db";
import { NewTodo, Todo } from "@/types";
import { todos } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const insertTodo = async (todo: NewTodo) => {
  const [result] = await db.insert(todos).values(todo).returning();
  return result;
};

export const getTodosByUserId = async (userId: string) => {
  const result = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(desc(todos.updatedAt));

  return result;
};

export const updateTodo = async (id: string, data: Partial<Todo>) => {
  const [result] = await db
    .update(todos)
    .set(data)
    .where(eq(todos.id, id))
    .returning();
  return result;
};

export const deleteTodo = async (id: string) => {
  await db.delete(todos).where(eq(todos.id, id));
};
