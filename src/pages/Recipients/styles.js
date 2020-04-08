import styled from 'styled-components';

import DefaultButton from '~/components/Button/DefaultButton';

export const Grid = styled.div`
  height: 400px;
  margin-top: 30px;
  > section {
    display: grid;
    padding-left: 25px;
    padding-right: 13px;
    grid-template-columns: 0.5fr 1fr 2fr 0.5fr;
    strong:last-child {
      text-align: right;
    }
    strong {
      font-size: 16px;
      color: #444;
    }
    margin-bottom: 15px;
  }
  > div + div {
    margin-top: 20px;
  }
`;

export const PaginationControl = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 20px;

  button {
    background: none;
    border: none;

    svg {
      color: #444444;
    }
  }

  button + button {
    margin-left: 16px;
  }
`;

export const Button = styled(DefaultButton)`
  width: 60px;
  height: 36px;
  &:disabled {
    cursor: not-allowed;
    svg {
      color: #999;
    }
  }
`;
