import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/search.svg';

export const Container = styled.header`
  a {
    text-decoration: none;
  }
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px 0;
  align-items: center;
  margin: 10px 0;
  border-bottom: 1px solid #666;
`;

export const MenuBar = styled.div`
  display: flex;
  align-items: center;



  ul {
    display: flex;
    align-items: center;
    list-style: none;
  }

  span {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #fff;
    margin-left: 25px;
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
