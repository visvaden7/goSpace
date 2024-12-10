import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const backgroundImg = "bg-[url('/goTravel')]"
    return (
        <div className={`w-screen h-screen flex flex-col ${backgroundImg} bg-cover bg-center h-screen w-full`}>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;