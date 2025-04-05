import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from '@/components/ui/input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { 
      control: 'select', 
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url']
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    onChange: { action: 'changed' }
  },
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    className: 'w-[300px]',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address...',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'Read-only content',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Input value',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value as string);
    
    return (
      <Input 
        {...args} 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
};

export const File: Story = {
  args: {
    type: 'file',
    className: 'w-full max-w-sm',
  },
}; 