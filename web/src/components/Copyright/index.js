import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Container, Copyright } from './styles';
import aphelium from '../../assets/LogoSolo.png';

export default function Header() {
  return (
    <Container>
      <img src={aphelium} alt="Aphelium" />
      <Copyright>
        <span>
          Powered with <FaHeart color="#48157e" /> by
          <a href="https://aphelium.com.br"> Aphelium</a>
        </span>
      </Copyright>
    </Container>
  );
}
