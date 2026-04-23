import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import TextField from '../../atoms/TextField/TextField';
import IconButton from '../../atoms/IconButton/IconButton';
import { ChangeTodoType } from '../../../types/ChangeTodoType';

type Props = {
  onAdd: (data: ChangeTodoType) => void;
  disabled: boolean;
};

const TodoForm = ({ onAdd, disabled }: Props) => {
  const { register, handleSubmit, reset } = useForm<ChangeTodoType>();

  const onSubmit = (data: ChangeTodoType) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TextField
          {...register('todo', { required: true })}
          type="text"
          label="New Todo"
          variant="outlined"
          required
          fullWidth
          sx={{ mr: 2 }}
          aria-label="text field"
          disabled={disabled}
        />
        <IconButton
          type="submit"
          color="primary"
          aria-label="add todo"
          disabled={disabled}
        >
          <Add />
        </IconButton>
      </Box>
    </form>
  );
};

export default TodoForm;
