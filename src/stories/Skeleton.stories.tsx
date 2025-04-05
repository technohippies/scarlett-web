import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@/components/ui/skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'w-[200px] h-4',
  },
};

export const Circle: Story = {
  args: {
    className: 'w-12 h-12 rounded-full',
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3 w-[300px]">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

export const LoadingCard: Story = {
  render: () => (
    <div className="flex items-center space-x-4 w-[350px] p-4 border border-white/10 rounded-lg">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  ),
};

export const TableLoading: Story = {
  render: () => (
    <div className="w-[500px]">
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-8 w-[100px] rounded-md" />
      </div>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border-t border-white/10">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="h-8 w-[60px] rounded-md" />
          </div>
        ))}
    </div>
  ),
}; 