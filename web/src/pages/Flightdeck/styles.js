import styled from 'styled-components';
import { darken } from 'polished';

export const Indicators = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;

  ul {
    display: flex;

    list-style: none;
  }
  li {
    border: 0.5px solid #666;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 215px;
    height: 120px;
    background: #fff;
    p {
      display: flex;
      justify-content: center;
      font-weight: bold;
      font-size: 25px;
      color: #333;
    }
    span {
      margin-top: 5px;
      display: flex;
      justify-content: center;
      color: #666;
      font-size: 12px;
    }
  }
`;

export const Container = styled.div`
  padding: 30px;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }

  button {
    background: #467FCF;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    font-weight: bold;
    text-transform: uppercase;
    /* transition: background 0.2s;
    &:hover {
      background: ${darken(0.07, '#467FCF')};
    } */
  }
`;
export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
    border-radius: 4px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;
export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    /* font-weight: bold; */
  }

  strong {
    font-size: 20px;
    margin-left: 5px;
  }
`;

export const SessionCharts = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChartCalender = styled.div`
  max-width: 1000px;
  margin-bottom: 18px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  svg {
    height: 250px;
    width: 850px;
    margin-bottom: -50px;
  }
`;

export const Chart = styled.div`
  max-width: 445px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 18px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  p {
    font-weight: bold;
    margin: 10px;
  }
`;
