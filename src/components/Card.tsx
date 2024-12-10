import {FunctionComponent} from 'react';

interface CardProps {
    title: string;
    content: string;
}

export const Card: FunctionComponent<CardProps> = ({ title, content }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};