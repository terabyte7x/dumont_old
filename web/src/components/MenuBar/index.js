import React from 'react';
import { IoIosPerson } from 'react-icons/io';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaChalkboardTeacher, FaPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, MenuBar } from './styles';

export default function Menubar() {
  return (
    <Container>
      <MenuBar>
        <ul>
          <li>
            <span>
              <AiOutlineSchedule />
              <Link to="/schedule">Escala de voo</Link>
            </span>
          </li>
          <li>
            <span>
              <IoIosPerson />
              Alunos
            </span>
          </li>
          <li>
            <span>
              <FaChalkboardTeacher />
              Instrutores
            </span>
          </li>
          <li>
            <span>
              <FaPlane />
              Horas
            </span>
          </li>
        </ul>
      </MenuBar>
    </Container>
  );
}
