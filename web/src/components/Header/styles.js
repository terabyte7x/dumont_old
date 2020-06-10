import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/search.svg';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px 0;
  align-items: center;
  margin: 10px 0;
  border-bottom: 1px solid #666;
`;

export const Search = styled.input`
  width: 450px;
  border: 1px solid #555;
  height: 34px;
  padding: 0 30px 0 12px;
  border-radius: 16px;
  color: #667;
  font-size: 12px;
  background: #f5f7fb url(${SearchIcon}) no-repeat 410px center;
  background-size: 20px;
`;
export const Notification = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;

export const User = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  ul {
    list-style: none;
  }
  li {
    margin-left: 15px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1.5px solid #109cf1;
  }

  p {
    font-weight: bold;
  }

  span {
    font-size: 12px;
    color: #555;
  }
`;
