'use client';
import React, { useState } from 'react';
import { siteConfig } from '@/app/lib/config/site';
import { useAuth } from '@/app/hooks/useAuth';

const AdminPanel: React.FC = () => {
    const { user, logout } = useAuth();
    const [maintenanceMode, setMaintenanceMode] = useState(siteConfig.offline);
    const [message, setMessage] = useState(siteConfig.maintenance.message);
    const [estimatedTime, setEstimatedTime] = useState(siteConfig.maintenance.estimatedTime);

    const handleToggleMaintenance = () => {
        // Trong thực tế, bạn sẽ gọi API để cập nhật config
        setMaintenanceMode(!maintenanceMode);
        
        // Cập nhật siteConfig (chỉ cho demo - trong thực tế cần API)
        (siteConfig as any).offline = !maintenanceMode;
        
        // Reload trang để áp dụng thay đổi
        window.location.reload();
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Không có quyền truy cập
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Bạn cần quyền admin để truy cập trang này.
                    </p>
                    <button
                        onClick={logout}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Admin Panel
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Xin chào, {user.email}</span>
                            <button
                                onClick={logout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>

                    {/* Maintenance Control */}
                    <div className="grid gap-6">
                        <div className="border rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Quản lý chế độ bảo trì</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Trạng thái bảo trì</h3>
                                        <p className="text-gray-600 text-sm">
                                            {maintenanceMode ? 'Website đang trong chế độ bảo trì' : 'Website hoạt động bình thường'}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={maintenanceMode}
                                            onChange={handleToggleMaintenance}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Thông báo bảo trì
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Thời gian dự kiến
                                    </label>
                                    <input
                                        type="text"
                                        value={estimatedTime}
                                        onChange={(e) => setEstimatedTime(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="VD: 2 giờ"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="border rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Trạng thái hệ thống</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-green-800">Server</h3>
                                    <p className="text-green-600">Hoạt động bình thường</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-blue-800">Database</h3>
                                    <p className="text-blue-600">Kết nối ổn định</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-yellow-800">API</h3>
                                    <p className="text-yellow-600">
                                        {maintenanceMode ? 'Chế độ bảo trì' : 'Hoạt động'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Allowed Users */}
                        <div className="border rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Người dùng được phép truy cập</h2>
                            <div className="space-y-2">
                                {siteConfig.maintenance.allowedUsers.map((email, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span>{email}</span>
                                        <span className="text-sm text-gray-500">Có quyền truy cập</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
