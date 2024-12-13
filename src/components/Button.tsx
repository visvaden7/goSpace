import {FunctionComponent} from 'react';

interface ButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({ label, className, onClick }) => {
    return <button onClick={onClick} className={className}>{label}</button>;
};