import React from 'react';
import {Chatbot} from "../components/Chatbot.tsx";

const ChatbotPage: React.FC = () => {
    return (
        <div>
            <h1>챗봇 페이지</h1>
            <Chatbot />
        </div>
    );
};

export default ChatbotPage;