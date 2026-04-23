import { useCallback, useState } from 'react';
import { isTodoType, TodoType } from '../../types/TodoType';
import { API } from '../../config/config';

type Result =
  | {
      isSuccess: true;
      newTodo: TodoType;
    }
  | {
      isSuccess: false;
    };

export const useAddTodo = () => {
  const [loading, setLoading] = useState(false);
  const addTodo = useCallback(async (todo: string): Promise<Result> => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo }),
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
      return { isSuccess: true, newTodo };
    } catch (error) {
      console.error(error);
      return { isSuccess: false };
    } finally {
      setLoading(false);
    }
  }, []);
  return { addTodo, loading };
};
