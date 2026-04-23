import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TodoTemplate from './TodoTemplate';
import { TodoType } from '../../../types/TodoType';
import { ChangeTodoType } from '../../../types/ChangeTodoType';

export default {
  title: 'Templates/TodoTemplate',
  component: TodoTemplate,
  argTypes: {
    onAddTodo: { action: 'added' },
    onDeleteTodo: { action: 'deleted' },
    onCompleteTodo: { action: 'completed' },
    onIncompleteTodo: { action: 'incompleted' },
    onUpdateTodo: { action: 'updated' },
    loading: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof TodoTemplate>> = (args) => <TodoTemplate {...args} />;

const defaultTodos: TodoType[] = [
  { id: '1', todo: 'Buy groceries', isCompleted: false, createdAt: new Date().toISOString() },
  { id: '2', todo: 'Walk the dog', isCompleted: true, createdAt: new Date().toISOString() },
];

export const Default = Template.bind({});
Default.args = {
  todos: defaultTodos,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  todos: defaultTodos,
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  todos: [],
  loading: false,
};

export const AddEnabled = Template.bind({});
AddEnabled.args = {
  todos: defaultTodos,
  loading: false,
  onAddTodo: (data: ChangeTodoType) => console.log('Add:', data),
  onDeleteTodo: (id: string) => console.log('Delete:', id),
  onCompleteTodo: (id: string) => console.log('Complete:', id),
  onIncompleteTodo: (id: string) => console.log('Incomplete:', id),
  onUpdateTodo: (id: string, text: string) => console.log('Update:', id, text),
};
