import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="root-layout">
            {/* Add common layout elements here, like header/footer specific to this layout */}
            {children}
        </div>
    );
}