import React from 'react';
import Header from '../components/Header';

const ChatbotLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
};

export default ChatbotLayout;