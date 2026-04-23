import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TodoItem from './TodoItem';
import { TodoType } from '../../../types/TodoType';

export default {
  title: 'Molecules/TodoItem',
  component: TodoItem,
  argTypes: {
    onDelete: { action: 'deleted' },
    onComplete: { action: 'completed' },
    onIncomplete: { action: 'incompleted' },
    onUpdate: { action: 'updated' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof TodoItem>> = (args) => <TodoItem {...args} />;

export const defaultTodo: TodoType = {
  id: '1',
  todo: 'Buy groceries',
  isCompleted: false,
  createdAt: new Date().toISOString(),
};

export const Default = Template.bind({});
Default.args = {
  todo: defaultTodo,
  disabled: false,
};

export const Completed = Template.bind({});
Completed.args = {
  todo: { ...defaultTodo, isCompleted: true },
  disabled: false,
};

export const Loading = Template.bind({});
Loading.args = {
  todo: defaultTodo,
  disabled: true,
};
