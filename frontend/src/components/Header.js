import { React, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from '../images/logo.svg';

function getLink(type, login, burgerClass, rightBlockClass, handleBurgerClick, signOut) {
  switch (type) {
    case '/sign-in': {
      return (
        <Link className='header__link' to={'/sign-up'}>
          Регистрация
        </Link>);
    }
    case '/': {
      return (<>
        <button className={burgerClass} onClick={handleBurgerClick}></button>
        <div className={rightBlockClass}>
          <p className="header__email">{login}</p>
          <Link className='header__link header__link_faded' to={'/sign-in'} onClick={signOut}>
            Выйти
          </Link>
        </div>
      </>
      );
    }
    default: {
      return (
        <Link className='header__link' to={'/sign-in'}>
          Войти
        </Link>
      );
    }
  }
}

function Header(props) {
  const { currentLocation, login, signOut } = props;
  const [userInfoOpened, setUserInfoOpened] = useState(false);
  const [headerClass, setHeaderClass] = useState('header');
  const { burgerClass, rightBlockClass } = userInfoOpened
    ? {
      burgerClass: 'header__humburger-button header__humburger-button_type_cross',
      rightBlockClass: 'header__right-block header__right-block_visible',
    }
    : {
      burgerClass: 'header__humburger-button',
      rightBlockClass: 'header__right-block',
    };

  function handleBurgerClick() {
    setUserInfoOpened(!userInfoOpened);
    if (headerClass === 'header') {
      setHeaderClass('header header_lowered');
    } else {
      setHeaderClass('header');
    }
  }

  const link = getLink(
    currentLocation,
    login,
    burgerClass,
    rightBlockClass,
    handleBurgerClick,
    signOut,
  );
  const headerContentClass = (currentLocation === '/') ? 'header__content' : 'header__content header__content_simple';

  return (
    <header className='header'>
      <div className={headerContentClass}>
        <img src={logo} className="logo" alt="Mesto Russia" />
      </div>
      {link}
    </header>
  );
}

export default withRouter(Header);
