import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/search.svg';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  border-top: 1px solid #c9c9c9;
`;

export const MenuBar = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
  }

  ul {
    display: flex;
    align-items: center;
    list-style: none;
  }

  span {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #c9c9c9;
    margin: 10px 25px 0 0 ;
    transition: color 0.2s;
    &:hover {
      color: #666;
      }
    }
    svg {
      margin-right: 5px;
    }
  }
`;
