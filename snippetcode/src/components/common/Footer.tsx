import React from 'react';

interface FooterProps {
    // Define your component props here
    message?: string;
}

const Footer: React.FC<FooterProps> = ({ message = 'Hello from Footer!' }) => {
    return (
        <div className="p-4 border rounded shadow">
            <p>{message}</p>
        </div>
    );
};

export default Footer;