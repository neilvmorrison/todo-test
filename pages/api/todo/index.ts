import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { Todo } from "../../../types/Todo";

const todos: Todo[] = [];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo | Todo[] | any>
) {
  if (req.method === "GET") {
    return res.status(200).json(todos);
  }
  if (req.method === "POST") {
    const { title } = JSON.parse(req.body);
    const newTodo = {
      id: v4(),
      title,
      created_at: new Date(),
      is_complete: false,
      user_id: "1234",
    };
    todos.push(newTodo);
    return res.status(200).json(todos);
  }

  if (req.method === "PATCH") {
    // this is pretty hacky but I want to avoid setting up a DB
    // this should be handled in a api/todos/[id].ts file.
    const { id, ...payload } = JSON.parse(req.body);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    let newTodo = { ...todos[todoIndex], ...payload };
    todos[todoIndex] = newTodo;
    return res.status(200).json(todos);
  }

  if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex || todoIndex === 0) {
      // zero is falsy
      todos.splice(todoIndex, 1);
      return res.status(200).json(todos);
    }
    return res.status(500);
  }
}
