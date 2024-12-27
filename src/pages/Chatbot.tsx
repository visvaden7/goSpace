import {FunctionComponent} from 'react';
import {Chatbot} from "../components/Chatbot.tsx";

export const ChatbotPage: FunctionComponent = () => {
    return (
        <div  className={'flex relative w-full h-[800px] items-center justify-center'}>
            <Chatbot />
        </div>
    );
};