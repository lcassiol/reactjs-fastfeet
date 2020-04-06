import styled from 'styled-components';

import DefaultButton from '~/components/Button/DefaultButton';

export const Grid = styled.div`
  height: 400px;
  margin-top: 30px;
  > section {
    display: grid;
    padding-left: 25px;
    padding-right: 13px;
    grid-template-columns: 0.5fr 1.5fr 1fr 1.5fr 1.5fr 1fr 1fr;
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

export const Button = styled(DefaultButton)`
  width: 100px;
  height: 36px;
  &:disabled {
    cursor: not-allowed;
    background: #666;
  }
`;
