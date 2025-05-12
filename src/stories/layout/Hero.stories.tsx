import type { Meta, StoryObj } from "@storybook/react"
import { Hero } from "@/components/layout/Hero"

const meta = {
  title: "Layout/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#171717" },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Hero />,
} 