import { Divider } from '@mui/material';
import TodoItem from '../../molecules/TodoItem/TodoItem';
import { TodoType } from '../../../types/TodoType';

type Props = {
  todos: TodoType[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onIncomplete: (id: string) => void;
  onUpdate: (id: string, todoText: string) => void;
  disabled: boolean;
};

const TodoList = ({
  todos,
  onDelete,
  onComplete,
  onIncomplete,
  onUpdate,
  disabled,
}: Props) => {
  return (
    <>
      <Divider sx={{ mb: 3 }} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onComplete={onComplete}
          onIncomplete={onIncomplete}
          onUpdate={onUpdate}
          disabled={disabled}
        />
      ))}
    </>
  );
};

export default TodoList;
