import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home Page - Your E-commerce',
    description: 'This is the Home page for Your E-commerce.',
};

export default function HomePage() {
    return (
        <div className="container mx-auto p-4">
            <h1>Welcome to the Home Page</h1>
            {/* Add your page content here */}
        </div>
    );
}