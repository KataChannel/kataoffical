import React from 'react';

interface HeaderProps {
    // Define your component props here
    message?: string;
}

const Header: React.FC<HeaderProps> = ({ message = 'Hello from Header!' }) => {
    return (
        <div className="p-4 border rounded shadow">
            <p>{message}</p>
        </div>
    );
};

export default Header;