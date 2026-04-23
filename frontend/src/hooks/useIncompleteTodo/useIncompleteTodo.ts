import { useCallback, useState } from 'react';
import { TodoType } from '../../types/TodoType';
import { API } from '../../config/config';

type Result =
  | {
      isSuccess: true;
      newTodos: TodoType[];
    }
  | {
      isSuccess: false;
    };

export const useIncompleteTodo = () => {
  const [loading, setLoading] = useState(false);
  const incompleteTodo = useCallback(
    async (id: string, todos: TodoType[]): Promise<Result> => {
      setLoading(true);
      try {
        const response = await fetch(`${API}/incomplete`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        if (response.status !== 200) {
          const { error } = await response.json();
          throw new Error(error);
        }
        const newTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: false } : todo
        );
        return { isSuccess: true, newTodos };
      } catch (error) {
        console.error(error);
        return { isSuccess: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { incompleteTodo, loading };
};
