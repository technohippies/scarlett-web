import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: { 
      control: 'radio', 
      options: ['horizontal', 'vertical'] 
    },
    decorative: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    className: 'w-[300px]',
  },
  render: (args) => (
    <div className="space-y-4 w-[300px]">
      <div className="text-white">Content above</div>
      <Separator {...args} />
      <div className="text-white">Content below</div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-[80px]',
  },
  render: (args) => (
    <div className="flex items-center space-x-4 h-[80px]">
      <div className="text-white">Left content</div>
      <Separator {...args} />
      <div className="text-white">Right content</div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    orientation: 'horizontal',
    className: 'w-[300px] bg-[#2563eb] h-[2px]',
  },
  render: (args) => (
    <div className="space-y-4 w-[300px]">
      <div className="text-white">Custom separator styling</div>
      <Separator {...args} />
      <div className="text-white">Thicker and blue</div>
    </div>
  ),
}; 