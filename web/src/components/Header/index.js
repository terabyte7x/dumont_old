import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdNotifications } from 'react-icons/md';
import { Container, Notification, Search, User } from './styles';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.jpg';

function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Dumont" />
      </Link>

      <Search placeholder="Comece a digitar..." />

      <Notification to="/cart">
        <MdNotifications size={25} color="#fff" />
      </Notification>

      <User>
        <img src={avatar} alt="Avatar" />
        <ul>
          <li>
            <p>Felipe Duque</p>
          </li>
          <li>
            {' '}
            <span>Administrador</span>
          </li>
        </ul>
      </User>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
