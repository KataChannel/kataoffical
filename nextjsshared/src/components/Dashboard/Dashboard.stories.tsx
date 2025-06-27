// filepath: /chikiet/kataoffical/kataoffical/nextjsshared/src/components/Dashboard/Dashboard.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Dashboard } from "./Dashboard";
import { DashboardConfig } from "../../types/common";

const meta: Meta<typeof Dashboard> = {
  title: "Components/Dashboard",
  component: Dashboard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Dashboard component chính cho ứng dụng quản trị",
      },
    },
  },
  argTypes: {
    config: {
      description: "Cấu hình dashboard",
    },
    children: {
      description: "Nội dung bên trong dashboard",
    },
    className: {
      description: "CSS class bổ sung",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

const defaultConfig: DashboardConfig = {
  title: "Admin Dashboard",
  logo: "https://via.placeholder.com/32x32",
  sidebar: {
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
        id: "settings",
        label: "Cài đặt",
        icon: "⚙️",
        href: "/settings",
      },
    ],
  },
  header: {
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
  },
};

const DashboardContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Tổng người dùng</h3>
        <p className="text-3xl font-bold text-blue-600">1,234</p>
        <p className="text-sm text-gray-500">+12% từ tháng trước</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Đơn hàng mới</h3>
        <p className="text-3xl font-bold text-green-600">567</p>
        <p className="text-sm text-gray-500">+5% từ tuần trước</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Doanh thu</h3>
        <p className="text-3xl font-bold text-purple-600">$12,345</p>
        <p className="text-sm text-gray-500">+23% từ tháng trước</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900">Tăng trưởng</h3>
        <p className="text-3xl font-bold text-orange-600">+23%</p>
        <p className="text-sm text-gray-500">Tăng trưởng ổn định</p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Biểu đồ doanh thu
      </h3>
      <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
        <p className="text-gray-500">Chart placeholder</p>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    config: defaultConfig,
    children: <DashboardContent />,
  },
};

export const WithoutSidebar: Story = {
  args: {
    config: {
      ...defaultConfig,
      sidebar: undefined,
    },
    children: <DashboardContent />,
  },
};

export const WithoutHeader: Story = {
  args: {
    config: {
      ...defaultConfig,
      header: undefined,
    },
    children: <DashboardContent />,
  },
};

export const MinimalConfig: Story = {
  args: {
    config: {
      title: "Simple Dashboard",
      sidebar: {
        items: [
          { id: "home", label: "Trang chủ", icon: "🏠", href: "/" },
          { id: "about", label: "Giới thiệu", icon: "ℹ️", href: "/about" },
        ],
      },
    },
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Minimal Dashboard</h1>
        <p>This is a simple dashboard with minimal configuration.</p>
      </div>
    ),
  },
};
