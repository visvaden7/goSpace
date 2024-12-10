import {FunctionComponent} from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({ label, onClick }) => {
    return <button onClick={onClick}>{label}</button>;
};