import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TextField from './TextField';

export default {
  title: 'Atoms/TextField',
  component: TextField,
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['outlined', 'filled', 'standard'] },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof TextField>> = (args) => <TextField {...args} />;

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Outlined Input',
  variant: 'outlined',
};

export const Standard = Template.bind({});
Standard.args = {
  label: 'Standard Input',
  variant: 'standard',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  disabled: true,
};
