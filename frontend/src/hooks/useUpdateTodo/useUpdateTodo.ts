import { useCallback, useState } from 'react';
import { isTodoType, TodoType } from '../../types/TodoType';
import { env } from '../../config/env';

type Result =
  | {
      isSuccess: true;
      newTodos: TodoType[];
    }
  | {
      isSuccess: false;
    };

export const useUpdateTodo = () => {
  const [loading, setLoading] = useState(false);
  const updateTodo = useCallback(
    async (
      editTodoId: string,
      editTodoName: string,
      editTodoIsCompleted: boolean,
      editTodoCreatedAt: string,
      todos: TodoType[],
    ): Promise<Result> => {
      setLoading(true);
      try {
        const response = await fetch(`${env.NEXT_PUBLIC_API_HOST}/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editTodoId,
            todo: editTodoName,
            isCompleted: editTodoIsCompleted,
            createdAt: editTodoCreatedAt,
          }),
        });
        if (response.status !== 200) {
          const { error } = await response.json();
          throw new Error(error);
        }
        const newTodo = await response.json();

        if (!isTodoType(newTodo)) {
          console.error('Invalid response format:', newTodo);
          throw new Error('Invalid response format');
        }
        const newTodos = todos.map(
          (todo: {
            id: string;
            todo: string;
            isCompleted: boolean;
            createdAt: string;
          }) => {
            return todo.id === newTodo.id ? { ...newTodo } : todo;
          },
        );
        return { isSuccess: true, newTodos };
      } catch (error) {
        console.error(error);
        return { isSuccess: false };
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return { updateTodo, loading };
};
