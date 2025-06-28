const fs = require('fs');
const path = require('path');

const baseDir = process.cwd(); // Thư mục gốc của dự án

// Hàm tạo nội dung boilerplate cho các loại file
const getFileContent = (type, name) => {
    switch (type) {
        case 'page':
            return `
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '${name} Page - Your E-commerce',
    description: 'This is the ${name} page for Your E-commerce.',
};

export default function ${name}Page() {
    return (
        <div className="container mx-auto p-4">
            <h1>Welcome to the ${name} Page</h1>
            {/* Add your page content here */}
        </div>
    );
}
`;
        case 'layout':
            return `
import React from 'react';

export default function ${name}Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="${name.toLowerCase()}-layout">
            {/* Add common layout elements here, like header/footer specific to this layout */}
            {children}
        </div>
    );
}
`;
        case 'component':
            return `
import React from 'react';

interface ${name}Props {
    // Define your component props here
    message?: string;
}

const ${name}: React.FC<${name}Props> = ({ message = 'Hello from ${name}!' }) => {
    return (
        <div className="p-4 border rounded shadow">
            <p>{message}</p>
        </div>
    );
};

export default ${name};
`;
        case 'hook':
            return `
import { useState, useEffect } from 'react';

const use${name} = () => {
    // Add your hook logic here
    const [data, setData] = useState(null);

    useEffect(() => {
        // Example: Fetch data
        // const fetchData = async () => {
        //     const response = await fetch('/api/some-data');
        //     const result = await response.json();
        //     setData(result);
        // };
        // fetchData();
    }, []);

    return data;
};

export default use${name};
`;
        case 'apiRoute':
            return `
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    // Example: Fetch data or perform server-side logic
    try {
        // const { searchParams } = new URL(req.url);
        // const id = searchParams.get('id');

        return NextResponse.json({ message: '${name} API route works!', timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// export async function POST(req: NextRequest) {
//     const body = await req.json();
//     return NextResponse.json({ message: 'POST request received', data: body });
// }
`;
        case 'service':
            return `
// src/lib/services/${name.toLowerCase()}.ts
// This file contains business logic related to ${name.toLowerCase()}

export const get${name}Details = async (id: string) => {
    // Example: Fetch data from an API or database via api calls
    // const response = await fetch(\`/api/${name.toLowerCase()}/$\{id}\`);
    // if (!response.ok) throw new Error('Failed to fetch ${name.toLowerCase()} details');
    // return response.json();
    console.log(\`Fetching ${name.toLowerCase()} details for ID: $\{id}\`);
    return { id, name: 'Sample ${name}', description: 'This is a sample ${name} item.' };
};

export const create${name} = async (data: any) => {
    // Example: Send data to an API
    // const response = await fetch(\`/api/${name.toLowerCase()}\`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Failed to create ${name.toLowerCase()}');
    // return response.json();
    console.log(\`Creating new ${name.toLowerCase()}: \`, data);
    return { ...data, id: 'new-${name}-id' };
};
`;
        case 'apiClient':
            return `
// src/lib/api/${name.toLowerCase()}Api.ts
// Client-side functions to interact with ${name.toLowerCase()} related backend APIs

import { ApiResponse } from '@/types'; // Assuming you have a types file

export const fetch${name} = async (id: string): Promise<ApiResponse<any>> => {
    try {
        const res = await fetch(\`/api/${name.toLowerCase()}s?id=$\{id}\`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch ${name.toLowerCase()}');
        }
        return await res.json();
    } catch (error: any) {
        console.error('Error fetching ${name.toLowerCase()}:', error.message);
        return { success: false, message: error.message };
    }
};

export const fetchAll${name}s = async (): Promise<ApiResponse<any[]>> => {
    try {
        const res = await fetch(\`/api/${name.toLowerCase()}s\`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch all ${name.toLowerCase()}s');
        }
        return await res.json();
    } catch (error: any) {
        console.error('Error fetching all ${name.toLowerCase()}s:', error.message);
        return { success: false, message: error.message };
    }
};
`;
        case 'type':
            return `
// src/types/${name.toLowerCase()}.d.ts

export interface ${name} {
    id: string;
    name: string;
    // Add other properties for ${name}
    [key: string]: any;
}

// Generic API response type
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    status?: number;
}
`;
        case 'util':
            return `
// src/lib/utils/${name.toLowerCase()}.ts
// Utility functions for ${name.toLowerCase()}

export const format${name} = (data: any): string => {
    // Add your formatting logic here
    return JSON.stringify(data, null, 2);
};

export const validate${name} = (data: any): boolean => {
    // Add your validation logic here
    return !!data;
};
`;
        default:
            return `// This is a new ${type} file named ${name}\n\n`;
    }
};

// Cấu hình các file và thư mục cần tạo
const filesToGenerate = [
    // App Router Pages & Layouts (example structure, adjust as needed)
    { type: 'page', name: 'HomePage', path: 'src/app' },
    { type: 'page', name: 'ShopPage', path: 'src/app/(shop)' },
    { type: 'page', name: 'ProductDetailPage', path: 'src/app/(shop)/products/[slug]' },
    { type: 'page', name: 'CartPage', path: 'src/app/(shop)/cart' },
    { type: 'page', name: 'CheckoutPage', path: 'src/app/(shop)/checkout' },
    { type: 'page', name: 'BlogPage', path: 'src/app/(blog)' },
    { type: 'page', name: 'BlogPostPage', path: 'src/app/(blog)/[slug]' },
    { type: 'page', name: 'AccountDashboardPage', path: 'src/app/(shop)/account/dashboard' },
    { type: 'layout', name: 'Shop', path: 'src/app/(shop)' }, // layout.tsx
    { type: 'layout', name: 'Blog', path: 'src/app/(blog)' }, // layout.tsx
    { type: 'layout', name: 'Root', path: 'src/app' }, // layout.tsx

    // API Routes
    { type: 'apiRoute', name: 'Products', path: 'src/app/api/products' }, // route.ts
    { type: 'apiRoute', name: 'BlogPosts', path: 'src/app/api/blog/posts' }, // route.ts
    { type: 'apiRoute', name: 'Auth', path: 'src/app/api/auth' }, // route.ts

    // Components
    { type: 'component', name: 'Button', path: 'src/components/ui' },
    { type: 'component', name: 'Input', path: 'src/components/ui' },
    { type: 'component', name: 'Header', path: 'src/components/common' },
    { type: 'component', name: 'Footer', path: 'src/components/common' },
    { type: 'component', name: 'ProductCard', path: 'src/components/shop' },
    { type: 'component', name: 'AddToCartButton', path: 'src/components/shop' },
    { type: 'component', name: 'BlogPostPreview', path: 'src/components/blog' },

    // Hooks
    { type: 'hook', name: 'Auth', path: 'src/hooks' }, // useAuth.ts
    { type: 'hook', name: 'Cart', path: 'src/hooks' }, // useCart.ts

    // Lib - Services (Business Logic)
    { type: 'service', name: 'Product', path: 'src/lib/services' }, // productService.ts
    { type: 'service', name: 'Blog', path: 'src/lib/services' }, // blogService.ts
    { type: 'service', name: 'Order', path: 'src/lib/services' }, // orderService.ts

    // Lib - API Client (Client-side API calls)
    { type: 'apiClient', name: 'Product', path: 'src/lib/api' }, // productApi.ts
    { type: 'apiClient', name: 'Blog', path: 'src/lib/api' }, // blogApi.ts
    { type: 'apiClient', name: 'Auth', path: 'src/lib/api' }, // authApi.ts

    // Lib - Types
    { type: 'type', name: 'Product', path: 'src/types' }, // product.d.ts
    { type: 'type', name: 'Blog', path: 'src/types' }, // blog.d.ts
    { type: 'type', name: 'User', path: 'src/types' }, // user.d.ts
    { type: 'type', name: 'Cart', path: 'src/types' }, // cart.d.ts

    // Lib - Utils
    { type: 'util', name: 'Formatter', path: 'src/lib/utils' }, // formatter.ts
    { type: 'util', name: 'Validator', path: 'src/lib/utils' }, // validator.ts

    // Global Styles (example)
    { type: 'raw', name: 'globals.css', path: 'src/styles', content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n` },
    { type: 'raw', name: 'variables.css', path: 'src/styles', content: `:root {\n  --primary-color: #0070f3;\n}\n` },
];

const generateFile = (fileConfig) => {
    const { type, name, path: relativePath, content: customContent } = fileConfig;
    let fileName = '';
    let fileContent = '';

    switch (type) {
        case 'page':
            fileName = 'page.tsx';
            fileContent = getFileContent(type, name.replace('Page', ''));
            break;
        case 'layout':
            fileName = 'layout.tsx';
            fileContent = getFileContent(type, name.replace('Layout', ''));
            break;
        case 'component':
            fileName = `${name}.tsx`;
            fileContent = getFileContent(type, name);
            break;
        case 'hook':
            fileName = `use${name}.ts`;
            fileContent = getFileContent(type, name);
            break;
        case 'apiRoute':
            fileName = 'route.ts'; // For Next.js 13+ App Router API routes
            fileContent = getFileContent(type, name);
            break;
        case 'service':
            fileName = `${name.toLowerCase()}Service.ts`;
            fileContent = getFileContent(type, name);
            break;
        case 'apiClient':
            fileName = `${name.toLowerCase()}Api.ts`;
            fileContent = getFileContent(type, name);
            break;
        case 'type':
            fileName = `${name.toLowerCase()}.d.ts`;
            fileContent = getFileContent(type, name);
            break;
        case 'util':
            fileName = `${name.toLowerCase()}.ts`;
            fileContent = getFileContent(type, name);
            break;
        case 'raw':
            fileName = name;
            fileContent = customContent;
            break;
        default:
            console.warn(`Unknown file type: ${type}`);
            return;
    }

    const fullPath = path.join(baseDir, relativePath, fileName);
    const directory = path.dirname(fullPath);

    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
        console.log(`Created directory: ${directory}`);
    }

    // Ghi nội dung vào file
    fs.writeFileSync(fullPath, fileContent.trim());
    console.log(`Generated: ${fullPath}`);
};

// Chạy quá trình tạo file
console.log('Starting file generation...');
filesToGenerate.forEach(generateFile);
console.log('File generation complete!');