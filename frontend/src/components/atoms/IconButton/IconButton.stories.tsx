import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import IconButton from './IconButton';
import { Add } from '@mui/icons-material';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'error', 'info', 'warning'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof IconButton>> = (args) => <IconButton {...args}><Add /></IconButton>;

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
