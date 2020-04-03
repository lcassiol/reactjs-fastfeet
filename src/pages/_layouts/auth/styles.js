import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #7d40e7;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  padding: 40px 25px;

  img {
    width: 250px;
    height: 45px;
    margin-left: 16px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 10px;
      letter-spacing: 0;
      color: #444444;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      font-size: 16px;
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #444444;
      margin: 5px 0 10px;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10px;
      font-size: 12px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 20px;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
