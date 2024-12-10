import React, { createContext, useState } from 'react';

const ChatbotContext = createContext<any>(null);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [responses, setResponses] = useState<string[]>([]);

    return (
        <ChatbotContext.Provider value={{ responses, setResponses }}>
            {children}
        </ChatbotContext.Provider>
    );
};
