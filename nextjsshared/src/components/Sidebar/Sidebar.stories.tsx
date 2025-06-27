import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sidebar } from "./Sidebar";
import { SidebarConfig } from "../../types/common";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Sidebar component với khả năng thu gọn và menu nhiều cấp",
      },
    },
  },
  argTypes: {
    collapsed: {
      control: "boolean",
      description: "Trạng thái thu gọn của sidebar",
    },
    config: {
      description: "Cấu hình sidebar",
    },
    onToggle: {
      description: "Callback khi toggle sidebar",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const defaultConfig: SidebarConfig = {
  width: 64,
  collapsible: true,
  items: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "🏠",
      href: "/dashboard",
      active: true,
    },
    {
      id: "users",
      label: "Người dùng",
      icon: "👥",
      href: "/users",
    },
    {
      id: "orders",
      label: "Đơn hàng",
      icon: "📦",
      href: "/orders",
      children: [
        {
          id: "orders-list",
          label: "Danh sách",
          href: "/orders/list",
        },
        {
          id: "orders-create",
          label: "Tạo mới",
          href: "/orders/create",
        },
      ],
    },
    {
      id: "analytics",
      label: "Phân tích",
      icon: "📊",
      href: "/analytics",
      children: [
        {
          id: "reports",
          label: "Báo cáo",
          href: "/analytics/reports",
        },
        {
          id: "metrics",
          label: "Thống kê",
          href: "/analytics/metrics",
        },
      ],
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: "⚙️",
      href: "/settings",
    },
  ],
};

export const Default: Story = {
  args: {
    config: defaultConfig,
    collapsed: false,
    onToggle: () => console.log("Toggle sidebar"),
  },
};

export const Collapsed: Story = {
  args: {
    config: defaultConfig,
    collapsed: true,
    onToggle: () => console.log("Toggle sidebar"),
  },
};

export const SimpleMenu: Story = {
  args: {
    config: {
      items: [
        { id: "home", label: "Trang chủ", icon: "🏠", href: "/" },
        { id: "about", label: "Giới thiệu", icon: "ℹ️", href: "/about" },
        { id: "contact", label: "Liên hệ", icon: "📞", href: "/contact" },
      ],
    },
    collapsed: false,
    onToggle: () => console.log("Toggle sidebar"),
  },
};
