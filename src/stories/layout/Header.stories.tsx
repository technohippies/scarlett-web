import type { Meta, StoryObj } from "@storybook/react"
import { Header } from "@/components/layout/Header" // Updated import path

const meta = {
  title: "Layout/Header", // Updated title
  component: Header,
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
  argTypes: {
    loggedIn: { control: "boolean" },
    address: { control: "text" },
    onConnect: { action: "onConnect" },
    locales: { control: "object" }, // Added for storybook control
    currentLocale: { control: "text" }, // Added for storybook control
    onLocaleChange: { action: "onLocaleChange" }, // Added for storybook control
  },
  args: {
    onConnect: () => {},
    onLocaleChange: (locale: string) => console.log("Locale changed to:", locale), // Example action
    locales: [
      { value: "en", label: "EN" },
      { value: "es", label: "ES" },
      { value: "fr", label: "FR" },
    ],
    currentLocale: "en",
  },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {
  args: {
    loggedIn: false,
    address: "",
  },
}

export const LoggedIn: Story = {
  args: {
    loggedIn: true,
    address: "0x1234567890abcdef1234567890abcdef12345678",
  },
} 