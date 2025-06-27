# @kataoffical/nextjs

Thư viện components dashboard tái sử dụng cho NextJS với Tailwind CSS, được thiết kế để tạo ra các giao diện quản trị hiện đại và responsive.

## 🚀 Tính năng

- ✅ Dashboard layout hoàn chỉnh với Sidebar và Header
- ✅ Responsive design cho mọi thiết bị
- ✅ Tailwind CSS với custom color palette
- ✅ TypeScript support đầy đủ
- ✅ Tree-shaking friendly
- ✅ Customizable và extensible
- ✅ Sidebar có thể thu gọn
- ✅ Dark/Light theme support
- ✅ Built-in search, notifications, profile menu

## 📦 Cài đặt

```bash
npm install @kataoffical/nextjs
# hoặc
yarn add @kataoffical/nextjs
# hoặc
pnpm add @kataoffical/nextjs
```

## 🛠️ Peer Dependencies

Đảm bảo bạn đã cài đặt các dependencies sau:

```bash
npm install react react-dom next tailwindcss
```

## ⚙️ Cấu hình

### 1. Cấu hình Tailwind CSS

Thêm đường dẫn đến components của thư viện trong `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@kataoffical/nextjs/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dashboard: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#10b981',
          background: '#f8fafc',
          surface: '#ffffff',
          text: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
```

### 2. Import CSS trong `_app.tsx` hoặc `layout.tsx`

```typescript
// Next.js App Router (app/layout.tsx)
import '@kataoffical/nextjs/dist/index.css';

// Next.js Pages Router (_app.tsx)
import '@kataoffical/nextjs/dist/index.css';
```

## 📖 Sử dụng cơ bản

### Dashboard Component

```typescript
// app/dashboard/page.tsx
'use client';

import { Dashboard, DashboardConfig } from '@kataoffical/nextjs';

const dashboardConfig: DashboardConfig = {
  title: 'Admin Dashboard',
  logo: '/logo.png',
  sidebar: {
    width: 64,
    collapsible: true,
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '🏠',
        href: '/dashboard',
        active: true
      },
      {
        id: 'users',
        label: 'Người dùng',
        icon: '👥',
        href: '/users'
      },
      {
        id: 'orders',
        label: 'Đơn hàng',
        icon: '📦',
        href: '/orders',
        children: [
          {
            id: 'orders-list',
            label: 'Danh sách',
            href: '/orders/list'
          },
          {
            id: 'orders-create',
            label: 'Tạo mới',
            href: '/orders/create'
          }
        ]
      }
    ]
  },
  header: {
    showSearch: true,
    showNotifications: true,
    showProfile: true,
    userMenu: [
      {
        label: 'Hồ sơ',
        href: '/profile'
      },
      {
        label: 'Cài đặt',
        href: '/settings'
      },
      { divider: true },
      {
        label: 'Đăng xuất',
        onClick: () => console.log('Logout')
      }
    ]
  }
};

export default function DashboardPage() {
  return (
    <Dashboard config={dashboardConfig}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Tổng người dùng</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Đơn hàng mới</h3>
          <p className="text-3xl font-bold text-green-600">567</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Doanh thu</h3>
          <p className="text-3xl font-bold text-purple-600">$12,345</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Tăng trưởng</h3>
          <p className="text-3xl font-bold text-orange-600">+23%</p>
        </div>
      </div>
    </Dashboard>
  );
}
```

### Sử dụng Hook useDashboard

```typescript
'use client';

import { useDashboard, DashboardConfig } from '@kataoffical/nextjs';

const initialConfig: DashboardConfig = {
  title: 'My Dashboard',
  sidebar: {
    items: []
  },
  header: {
    showSearch: true,
    showProfile: true
  }
};

export default function MyDashboard() {
  const { config, updateConfig, updateSidebarItems, loading } = useDashboard(initialConfig);
  
  // Cập nhật sidebar items động
  const handleUpdateMenu = () => {
    updateSidebarItems([
      {
        id: 'new-item',
        label: 'Menu mới',
        icon: '⭐',
        href: '/new'
      }
    ]);
  };

  return (
    <div>
      <button onClick={handleUpdateMenu}>
        Cập nhật menu
      </button>
      {/* Render dashboard với config đã cập nhật */}
    </div>
  );
}
```

## 🎨 Customization

### Custom Styling

Bạn có thể override các style mặc định bằng cách sử dụng Tailwind classes:

```typescript
<Dashboard 
  config={config}
  className="custom-dashboard-class"
>
  {/* content */}
</Dashboard>
```

### Custom Sidebar Item

```typescript
const customSidebarItem = {
  id: 'custom',
  label: 'Custom Item',
  icon: '⚙️',
  onClick: () => {
    // Custom logic
    console.log('Custom item clicked');
  },
  children: [
    {
      id: 'sub1',
      label: 'Sub Item 1',
      href: '/custom/sub1'
    }
  ]
};
```

## 📱 Responsive Design

Thư viện được thiết kế responsive với các breakpoint:

- **Mobile**: Sidebar ẩn, hiển thị hamburger menu
- **Tablet**: Sidebar có thể thu gọn
- **Desktop**: Sidebar mở rộng đầy đủ

## 🔧 API Reference

### DashboardConfig

```typescript
interface DashboardConfig {
  title: string;              // Tiêu đề dashboard
  logo?: string;              // URL logo
  theme?: 'light' | 'dark';   // Theme (coming soon)
  sidebar?: SidebarConfig;    // Cấu hình sidebar
  header?: HeaderConfig;      // Cấu hình header
}
```

### SidebarConfig

```typescript
interface SidebarConfig {
  width?: number;             // Độ rộng sidebar (default: 64)
  collapsible?: boolean;      // Có thể thu gọn (default: true)
  items: SidebarItem[];       // Danh sách menu items
}
```

### SidebarItem

```typescript
interface SidebarItem {
  id: string;                 // ID unique
  label: string;              // Nhãn hiển thị
  icon?: string;              // Icon (emoji hoặc SVG)
  href?: string;              // Link URL
  onClick?: () => void;       // Custom click handler
  children?: SidebarItem[];   // Menu con
  active?: boolean;           // Trạng thái active
}
```

### HeaderConfig

```typescript
interface HeaderConfig {
  showSearch?: boolean;       // Hiển thị search box
  showNotifications?: boolean; // Hiển thị notifications
  showProfile?: boolean;      // Hiển thị profile menu
  userMenu?: UserMenuItem[];  // Menu người dùng
}
```

## 🎯 Examples

### 1. Dashboard đơn giản

```typescript
const simpleConfig: DashboardConfig = {
  title: 'Simple Dashboard',
  sidebar: {
    items: [
      { id: 'home', label: 'Trang chủ', icon: '🏠', href: '/' },
      { id: 'about', label: 'Giới thiệu', icon: 'ℹ️', href: '/about' }
    ]
  }
};
```

### 2. Dashboard với menu nhiều cấp

```typescript
const advancedConfig: DashboardConfig = {
  title: 'Advanced Dashboard',
  sidebar: {
    items: [
      {
        id: 'ecommerce',
        label: 'E-commerce',
        icon: '🛒',
        children: [
          { id: 'products', label: 'Sản phẩm', href: '/products' },
          { id: 'categories', label: 'Danh mục', href: '/categories' },
          {
            id: 'orders',
            label: 'Đơn hàng',
            children: [
              { id: 'pending', label: 'Chờ xử lý', href: '/orders/pending' },
              { id: 'completed', label: 'Hoàn thành', href: '/orders/completed' }
            ]
          }
        ]
      }
    ]
  },
  header: {
    showSearch: true,
    showNotifications: true,
    showProfile: true
  }
};
```

### 3. Dashboard với custom actions

```typescript
const interactiveConfig: DashboardConfig = {
  title: 'Interactive Dashboard',
  sidebar: {
    items: [
      {
        id: 'refresh',
        label: 'Làm mới',
        icon: '🔄',
        onClick: () => {
          window.location.reload();
        }
      }
    ]
  }
};
```

## 🚀 Development

### Build thư viện

```bash
npm run build
```

### Development mode

```bash
npm run dev
```

### Testing

```bash
npm run test
```

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Contributing

Contributions, issues và feature requests đều được chào đón!

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Support

- 📧 Email: support@kataoffical.com
- 🐛 Issues: [GitHub Issues](https://github.com/KataChannel/kataoffical/issues)
- 📖 Documentation: [Docs](https://docs.kataoffical.com)

---

Made with ❤️ by [KataOffical](https://github.com/KataChannel)


# Development
npm run dev

# Test
npm run pre-check

# Build và publish
npm run build-and-publish