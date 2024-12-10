import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow p-4 z-10">
            <h1 className="text-xl text-black font-bold">수학여행을 우주로 가자</h1>
        </header>
    );
};

export default Header;