import { StoryObj, Meta } from "@storybook/react";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import { List } from "@phosphor-icons/react";

const meta: Meta<typeof AppSidebar> = {
  title: "UI/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  render: () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <AppSidebar 
        isOpen={false} 
        onClose={() => console.log("Sidebar closed")}
        trigger={
          <Button variant="ghost" size="icon">
            <List size={24} />
          </Button>
        }
      />
    </div>
  )
};

export const Opened: Story = {
  render: () => (
    <div style={{ height: "100vh", width: "100vw" }}>
      <AppSidebar 
        isOpen={true} 
        onClose={() => console.log("Sidebar closed")}
        trigger={
          <Button variant="ghost" size="icon">
            <List size={24} />
          </Button>
        }
      />
    </div>
  )
}; 