import React from 'react';
import { Link } from 'react-router-dom';
function Header(props) {
  return (
    <div>
      <header className="d-flex justify-between align-center p-40">
        <Link to="">
          <div className="headerLeft d-flex align-center">
            <img width={40} height={40} src="/img/logo.png" alt="logo" />
            <div>
              <h3 className="text-uppercase"> React Sneakers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className="headerRight d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width={18} height={18} src="/img/cart.svg" alt="cart" />
            <span>1205 руб.</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites">
              <img width={18} height={18} src="/img/wishlist.svg" alt="wishlist" />
            </Link>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="user" />
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
