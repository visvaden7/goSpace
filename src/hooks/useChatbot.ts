import { useState } from 'react';

const useChatbot = () => {
    const [responses, setResponses] = useState<string[]>([]);

    const addResponse = (response: string) => {
        setResponses(prev => [...prev, response]);
    };

    return { responses, addResponse };
};

export default useChatbot;