import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TodoList from './TodoList';
import { TodoType } from '../../../types/TodoType';

export default {
  title: 'Organisms/TodoList',
  component: TodoList,
  argTypes: {
    onDelete: { action: 'deleted' },
    onComplete: { action: 'completed' },
    onIncomplete: { action: 'incompleted' },
    onUpdate: { action: 'updated' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof TodoList>> = (args) => <TodoList {...args} />;

const defaultTodos: TodoType[] = [
  { id: '1', todo: 'Buy groceries', isCompleted: false, createdAt: new Date().toISOString() },
  { id: '2', todo: 'Walk the dog', isCompleted: true, createdAt: new Date().toISOString() },
  { id: '3', todo: 'Do laundry', isCompleted: false, createdAt: new Date().toISOString() },
];

export const Default = Template.bind({});
Default.args = {
  todos: defaultTodos,
  disabled: false,
};

export const Loading = Template.bind({});
Loading.args = {
  todos: defaultTodos,
  disabled: true,
};

export const Empty = Template.bind({});
Empty.args = {
  todos: [],
  disabled: false,
};
