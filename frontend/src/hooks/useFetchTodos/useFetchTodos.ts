import { useCallback, useState } from 'react';
import { TodoType } from '../../types/TodoType';
import { isAnotherTodoArrayType } from '../../types/AnotherTodoArrayType';
import { API } from '../../config/config';

type Result =
  | {
      isSuccess: true;
      fetchTodos: TodoType[];
    }
  | {
      isSuccess: false;
    };

export const useFetchTodos = () => {
  const [loading, setLoading] = useState(false);
  const fetchTodos = useCallback(async (): Promise<Result> => {
    setLoading(true);
    console.log('Fetching todos from API:', API);
    try {
      const response = await fetch(`${API}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        const { error } = await response.json();
        throw new Error(error);
      }
      const { todos } = await response.json();

      if (!isAnotherTodoArrayType(todos)) {
        console.error('Invalid response format:', todos);
        throw new Error('Invalid response format');
      }

      const fetchTodos = todos.map(
        (todo: {
          id: string;
          todo: string;
          completed: number;
          created_at: string;
        }) => ({
          id: todo.id,
          todo: todo.todo,
          isCompleted: todo.completed === 1,
          createdAt: todo.created_at,
        }),
      ) as TodoType[];

      return { isSuccess: true, fetchTodos };
    } catch (error) {
      console.error(error);
      return { isSuccess: false };
    } finally {
      setLoading(false);
    }
  }, []);
  return { fetchTodos, loading };
};
