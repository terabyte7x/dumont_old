import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #c9c9c9;
  img {
    margin-top: 10px;
    height: 30px;
  }
`;

export const Copyright = styled.div`
  span {
    color: #c9c9c9;
  }
  a {
    text-decoration: none;
    color: #48157e;
    transition: color 0.2s;
    &:hover {
      color: ${darken(0.03, '#48157e')};
    }
  }
`;
