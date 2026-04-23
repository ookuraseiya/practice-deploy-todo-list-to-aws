import { useState } from 'react';
import {
  Typography,
  CardContent,
  CardActions,
  Box,
  TextField,
} from '@mui/material';
import { Edit, Delete, CheckCircle, Undo } from '@mui/icons-material';
import IconButton from '../../atoms/IconButton/IconButton';
import Button from '../../atoms/Button/Button';
import { TodoType } from '../../../types/TodoType';
import { useForm } from 'react-hook-form';
import { ChangeTodoType } from '../../../types/ChangeTodoType';

type Props = {
  todo: TodoType;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onIncomplete: (id: string) => void;
  onUpdate: (id: string, todoText: string) => void;
  disabled: boolean;
};

const TodoItem = ({
  todo,
  onDelete,
  onComplete,
  onIncomplete,
  onUpdate,
  disabled,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<ChangeTodoType>();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (data: ChangeTodoType) => {
    onUpdate(todo.id, data.editTodoName!);
    setIsEditing(false);
    reset();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2,
        borderRadius: 2,
        boxShadow: 2,
        padding: 2,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {isEditing ? (
          <form
            onSubmit={handleSubmit(handleSaveClick)}
            style={{ display: 'flex', flexDirection: 'column' as const }}
          >
            <TextField
              {...register('editTodoName', { required: true })}
              type="text"
              defaultValue={todo.todo}
              variant="standard"
              fullWidth
              disabled={disabled}
            />
            <Box sx={{ mt: 1 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="small"
                sx={{ mr: 1 }}
                disabled={disabled}
                aria-label="save todo"
              >
                Save
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outlined"
                size="small"
                disabled={disabled}
                aria-label="cancel todo"
              >
                Cancel
              </Button>
            </Box>
          </form>
        ) : (
          <Typography
            variant="body1"
            sx={{
              flex: 1,
              wordWrap: 'break-word',
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
              color: todo.isCompleted ? 'gray' : 'inherit',
            }}
          >
            {todo.todo}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 1,
        }}
      >
        {!isEditing && (
          <>
            {todo.isCompleted ? (
              <IconButton
                color="warning"
                onClick={() => onIncomplete(todo.id)}
                disabled={disabled}
                aria-label="incomplete todo"
              >
                <Undo />
              </IconButton>
            ) : (
              <IconButton
                color="success"
                onClick={() => onComplete(todo.id)}
                disabled={disabled}
                aria-label="complete todo"
              >
                <CheckCircle />
              </IconButton>
            )}
            <IconButton
              color="primary"
              onClick={handleEditClick}
              disabled={disabled}
              aria-label="edit todo"
            >
              <Edit />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => onDelete(todo.id)}
              disabled={disabled}
              aria-label="delete todo"
            >
              <Delete />
            </IconButton>
          </>
        )}
      </CardActions>
    </Box>
  );
};

export default TodoItem;
