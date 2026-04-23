import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TodoForm from './TodoForm';

export default {
  title: 'Molecules/TodoForm',
  component: TodoForm,
  argTypes: {
    onAdd: { action: 'added' },
    disabled: { control: 'boolean' },
  },
} as Meta;

export const Template: StoryFn<React.ComponentProps<typeof TodoForm>> = (args) => <TodoForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};

export const Loading = Template.bind({});
Loading.args = {
  disabled: true,
};
