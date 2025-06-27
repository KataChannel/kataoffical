'use client'
import { useState, useEffect } from 'react';
export default function Page() {
  // Handle scroll to detect when navigation should be fixed
  useEffect(() => {

  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 grid lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900">Game V1</h2>
            <p className="text-gray-600">Welcome to your dashboard!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <ul className="space-y-2">   
              <li className="text-gray-700">User John Doe logged in</li>
              <li className="text-gray-700">Order #1234 was placed</li>
              <li className="text-gray-700">Product XYZ was updated</li>
            </ul>
          </div>
        </div>
      </div>
  );
}
