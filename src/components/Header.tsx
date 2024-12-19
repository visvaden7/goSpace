import {FunctionComponent} from 'react';
import {Link} from "react-router-dom";
import logo from '/src/assets/images/goSpace_logo.svg'

const Header: FunctionComponent = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-[80px] z-10 flex justify-center items-center">
          <Link to={'/'}>
            <img src={logo} alt={'logo'} className={''}/>
          </Link>
        </header>
    );
};

export default Header;