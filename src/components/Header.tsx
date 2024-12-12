import React from 'react';
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow p-4 z-10">
          <Link to={'/'}>
            <h1 className="text-xl text-black font-bold">수학여행을 우주로 가자</h1>
          </Link>
        </header>
    );
};

export default Header;