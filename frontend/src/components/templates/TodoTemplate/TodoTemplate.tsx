import { Box, Container, Typography } from '@mui/material';
import TodoForm from '../../molecules/TodoForm/TodoForm';
import TodoList from '../../organisms/TodoList/TodoList';
import { TodoType } from '../../../types/TodoType';
import { ChangeTodoType } from '../../../types/ChangeTodoType';

type Props = {
  todos: TodoType[];
  onAddTodo: (data: ChangeTodoType) => void;
  onDeleteTodo: (id: string) => void;
  onCompleteTodo: (id: string) => void;
  onIncompleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, todoText: string) => void;
  loading: boolean;
};

const TodoTemplate = ({
  todos,
  onAddTodo,
  onDeleteTodo,
  onCompleteTodo,
  onIncompleteTodo,
  onUpdateTodo,
  loading,
}: Props) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 3 }}>
          TodoList
        </Typography>

        <TodoForm onAdd={onAddTodo} disabled={loading} />

        <TodoList
          todos={todos}
          onDelete={onDeleteTodo}
          onComplete={onCompleteTodo}
          onIncomplete={onIncompleteTodo}
          onUpdate={onUpdateTodo}
          disabled={loading}
        />
      </Box>
    </Container>
  );
};

export default TodoTemplate;
