import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    rows: { control: 'number' },
    onChange: { action: 'changed' }
  },
  args: {
    placeholder: 'Type your message here...',
    disabled: false,
    rows: 4,
    className: 'w-[300px]',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is some example text for the textarea component. You can edit this to see how the component handles different content lengths.',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    
    return (
      <Textarea 
        {...args} 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
};

export const LargeTextarea: Story = {
  args: {
    rows: 8,
    className: 'w-[400px]',
    placeholder: 'This is a larger textarea for writing longer content...',
  },
};

export const WithMaxLength: Story = {
  args: {
    maxLength: 100,
    placeholder: 'Limited to 100 characters...',
  },
  render: (args) => {
    const [value, setValue] = React.useState('');
    
    return (
      <div className="space-y-2">
        <Textarea 
          {...args} 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="text-xs text-right text-white/70">
          {value.length}/{args.maxLength} characters
        </div>
      </div>
    );
  }
}; 