import { useEffect, useState } from 'react';
import { useAddTodo } from '../../../hooks/useAddTodo/useAddTodo';
import { useFetchTodos } from '../../../hooks/useFetchTodos/useFetchTodos';
import { useDeleteTodo } from '../../../hooks/useDeleteTodo/useDeleteTodo';
import { useUpdateTodo } from '../../../hooks/useUpdateTodo/useUpdateTodo';
import { useCompletedTodo } from '../../../hooks/useCompletedTodo/useCompletedTodo';
import { useIncompleteTodo } from '../../../hooks/useIncompleteTodo/useIncompleteTodo';
import { TodoType } from '../../../types/TodoType';
import { ChangeTodoType } from '../../../types/ChangeTodoType';
import TodoTemplate from '../../templates/TodoTemplate/TodoTemplate';

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { fetchTodos, loading: fetchLoading } = useFetchTodos();
  const { addTodo, loading: addLoading } = useAddTodo();
  const { deleteTodo, loading: deleteLoading } = useDeleteTodo();
  const { updateTodo, loading: updateLoading } = useUpdateTodo();
  const { completedTodo, loading: completedLoading } = useCompletedTodo();
  const { incompleteTodo, loading: incompleteLoading } = useIncompleteTodo();

  const loading =
    addLoading ||
    fetchLoading ||
    deleteLoading ||
    updateLoading ||
    completedLoading ||
    incompleteLoading;

  const handleAddTodo = async ({ todo }: ChangeTodoType) => {
    const result = await addTodo(todo);
    if (result.isSuccess) {
      setTodos((prevTodos) => [result.newTodo, ...prevTodos]);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const result = await deleteTodo(id, todos);
    if (result.isSuccess) {
      setTodos(result.newTodos);
    }
  };

  const handleUpdateTodo = async (id: string, todoText: string) => {
    const todoToUpdate = todos.find((t) => t.id === id);
    if (todoToUpdate) {
      const result = await updateTodo(
        id,
        todoText,
        todoToUpdate.isCompleted,
        todoToUpdate.createdAt,
        todos
      );
      if (result.isSuccess) {
        setTodos(result.newTodos);
      }
    }
  };

  const handleCompletedTodo = async (id: string) => {
    const result = await completedTodo(id, todos);
    if (result.isSuccess) {
      setTodos(result.newTodos);
    }
  };

  const handleIncompleteTodo = async (id: string) => {
    const result = await incompleteTodo(id, todos);
    if (result.isSuccess) {
      setTodos(result.newTodos);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await fetchTodos();
      if (result.isSuccess) {
        setTodos(result.fetchTodos);
      }
    })();
  }, [fetchTodos]);

  return (
    <TodoTemplate
      todos={todos}
      onAddTodo={handleAddTodo}
      onDeleteTodo={handleDeleteTodo}
      onCompleteTodo={handleCompletedTodo}
      onIncompleteTodo={handleIncompleteTodo}
      onUpdateTodo={handleUpdateTodo}
      loading={loading}
    />
  );
};

export default TodoPage;
