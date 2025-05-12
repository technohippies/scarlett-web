import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#171717" },
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[180px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Controlled component example
export const Default = () => {
  const [value, setValue] = useState("fr")
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const WithGroups: Story = {
  render: () => (
    <Select defaultValue="english">
      <SelectTrigger>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="french">French</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="japanese">Japanese</SelectItem>
          <SelectItem value="chinese">Chinese</SelectItem>
          <SelectItem value="korean">Korean</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select defaultValue="fr">
      <SelectTrigger>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="de" disabled>
          Deutsch (Unavailable)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
}
