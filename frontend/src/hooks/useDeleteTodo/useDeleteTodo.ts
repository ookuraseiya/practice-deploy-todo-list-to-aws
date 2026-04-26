import { useCallback, useState } from 'react';
import { TodoType } from '../../types/TodoType';
import { env } from '../../config/env';

type Result =
  | {
      isSuccess: true;
      newTodos: TodoType[];
    }
  | {
      isSuccess: false;
    };

export const useDeleteTodo = () => {
  const [loading, setLoading] = useState(false);
  const deleteTodo = useCallback(
    async (id: string, todos: TodoType[]): Promise<Result> => {
      setLoading(true);
      try {
        const response = await fetch(`${env.NEXT_PUBLIC_API_HOST}/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        if (response.status !== 200) {
          const { error } = await response.json();
          throw new Error(error);
        }
        const newTodos = todos.filter((todo) => todo.id !== id);
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
  return { deleteTodo, loading };
};
