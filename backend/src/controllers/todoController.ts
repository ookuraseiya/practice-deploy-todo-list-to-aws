import type { Request, Response } from 'express';
import { uid } from 'uid';
import {
  getTodos,
  addTodo as addTodoModel,
  deleteTodo as deleteTodoModel,
  updateTodo as updateTodoModel,
  completedTodo as completedTodoModel,
  incompleteTodo as incompleteTodoModel,
} from '../models/todoModel';

export const getAllTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await getTodos();
    return res.status(200).json({ todos });
  } catch (error) {
    console.error('getAllTodos error:', error);
    return res.status(500).json({ message: 'データの取得に失敗しました' });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { todo } = req.body as { todo: string };
    const id = uid();
    const isCompleted = 0;
    const createdAt = new Date();
    await addTodoModel(id, todo, isCompleted);
    return res.status(200).json({ id, todo, isCompleted: false, createdAt });
  } catch (error) {
    console.error('addTodo error:', error);
    return res.status(500).json({ message: 'Todoの追加に失敗しました' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as { id: string };
    await deleteTodoModel(id);
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('deleteTodo error:', error);
    return res.status(500).json({ message: 'Todoの削除に失敗しました' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id, todo, isCompleted, createdAt } = req.body as {
      id: string;
      todo: string;
      isCompleted: boolean;
      createdAt: string;
    };
    await updateTodoModel(id, todo);
    return res.status(200).json({ id, todo, isCompleted, createdAt });
  } catch (error) {
    console.error('updateTodo error:', error);
    return res.status(500).json({ message: 'Todoの更新に失敗しました' });
  }
};

export const completedTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as { id: string };
    await completedTodoModel(id);
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('completedTodo error:', error);
    return res.status(500).json({ message: 'ステータスの更新に失敗しました' });
  }
};

export const incompleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.body as { id: string };
    await incompleteTodoModel(id);
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('incompleteTodo error:', error);
    return res.status(500).json({ message: 'ステータスの更新に失敗しました' });
  }
};
