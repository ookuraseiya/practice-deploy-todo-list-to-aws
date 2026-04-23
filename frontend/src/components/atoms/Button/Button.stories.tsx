import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  color: 'secondary',
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: 'Outlined Button',
  variant: 'outlined',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Button',
  disabled: true,
};
