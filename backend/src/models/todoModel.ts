import { runQuery } from './runQuery';

export const getTodos = async () => {
  const SQL = 'SELECT * FROM todo' as const;
  return await runQuery(SQL);
};

export const addTodo = async (
  id: string,
  todo: string,
  isCompleted: number,
) => {
  const SQL =
    'INSERT INTO todo (id, todo, completed) VALUES (?, ?, ?)' as const;
  return await runQuery(SQL, [id, todo, isCompleted]);
};

export const deleteTodo = async (id: string) => {
  const SQL = 'DELETE FROM todo WHERE id = ?' as const;
  return await runQuery(SQL, [id]);
};

export const updateTodo = async (id: string, todo: string) => {
  const SQL = 'UPDATE todo SET todo = ? WHERE id = ?' as const;
  return await runQuery(SQL, [todo, id]);
};

export const completedTodo = async (id: string) => {
  const SQL = 'UPDATE todo SET completed = 1 WHERE id = ?' as const;
  return await runQuery(SQL, [id]);
};

export const incompleteTodo = async (id: string) => {
  const SQL = 'UPDATE todo SET completed = 0 WHERE id = ?' as const;
  return await runQuery(SQL, [id]);
};
