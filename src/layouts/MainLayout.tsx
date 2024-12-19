import {FunctionComponent, ReactNode} from 'react';
import Header from '../components/Header';

export const MainLayout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={`w-screen h-screen flex flex-col`}>
            <Header />
            <main className="flex-grow mt-[80px]">{children}</main>
        </div>
    );
};
