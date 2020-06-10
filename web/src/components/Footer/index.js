import React from 'react';
import { Link } from 'react-router-dom';
import { Container, MenuBar } from './styles';

export default function Menubar() {
  return (
    <Container>
      <MenuBar>
        <ul>
          <li>
            <span>Alunos</span>
            <span>Instrutores</span>
          </li>
          <li>
            <span>Horas</span>
            <span>Instrutores</span>
          </li>
        </ul>
      </MenuBar>
    </Container>
  );
}
