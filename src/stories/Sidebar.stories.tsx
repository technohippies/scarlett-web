import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const meta = {
  title: 'UI/Sidebar',
  component: SidebarProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
  },
  args: {
    defaultOpen: true,
  },
} satisfies Meta<typeof SidebarProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSidebar: Story = {
  render: (args) => (
    <SidebarProvider {...args}>
      <Sidebar>
        <SidebarHeader className="border-b border-white/10 px-4 py-3">
          <div className="text-lg font-semibold text-white">My App</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                Users
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-white/10 px-4 py-3">
          <div className="text-sm text-white/70">Logged in as Admin</div>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Main Content</h1>
        <p className="text-white/70 mb-4">This is the main content area that would typically contain your application.</p>
        <SidebarTrigger>
          Toggle Sidebar
        </SidebarTrigger>
      </div>
    </SidebarProvider>
  ),
};