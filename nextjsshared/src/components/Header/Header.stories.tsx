import type { Meta, StoryObj } from "@storybook/nextjs";
import { Header } from "./Header";
import { HeaderConfig } from "../../types/common";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Header component với search, notifications và profile menu",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Tiêu đề hiển thị trong header",
    },
    logo: {
      control: "text",
      description: "URL logo",
    },
    config: {
      description: "Cấu hình header",
    },
    onMenuClick: {
      description: "Callback khi click menu button",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

const defaultConfig: HeaderConfig = {
  showSearch: true,
  showNotifications: true,
  showProfile: true,
  userMenu: [
    {
      label: "Hồ sơ",
      href: "/profile",
    },
    {
      label: "Cài đặt",
      href: "/settings",
    },
    {
      divider: true,
      label: "",
    },
    {
      label: "Đăng xuất",
      onClick: () => console.log("Logout"),
    },
  ],
};

export const Default: Story = {
  args: {
    config: defaultConfig,
    title: "Admin Dashboard",
    logo: "https://via.placeholder.com/32x32",
    onMenuClick: () => console.log("Menu clicked"),
  },
};

export const WithoutSearch: Story = {
  args: {
    config: {
      ...defaultConfig,
      showSearch: false,
    },
    title: "Dashboard",
    onMenuClick: () => console.log("Menu clicked"),
  },
};

export const WithoutNotifications: Story = {
  args: {
    config: {
      ...defaultConfig,
      showNotifications: false,
    },
    title: "Dashboard",
    onMenuClick: () => console.log("Menu clicked"),
  },
};

export const MinimalHeader: Story = {
  args: {
    config: {
      showSearch: false,
      showNotifications: false,
      showProfile: false,
    },
    title: "Simple Dashboard",
    onMenuClick: () => console.log("Menu clicked"),
  },
};
