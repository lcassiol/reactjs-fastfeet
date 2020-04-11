import styled from 'styled-components';

export const Container = styled.div`
  height: 57px;
  background: #fff;
  border-radius: 4px;
  padding-left: 25px;
  padding-right: 13px;
  display: grid;

  grid-template-columns: 1fr 2.5fr 0.5fr;
  > small:last-child {
    text-align: right;
  }
  > small {
    font-size: 16px;
    color: #666;
    text-align: left;
    margin: auto 0;

    img {
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
  }

  > section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const MoreContainer = styled.div`
  padding: 10px;
  > div {
    display: flex;
    align-items: center;
    padding-bottom: 6px;
    button {
      background: none;
      border: none;
      display: flex;
    }
    svg {
      margin-right: 8px;
    }
    span {
      font-size: 16px;
      color: #999;
    }
    :nth-last-child(-n + 1) {
      padding-top: 6px;
      border-top: 1px solid #eee;
    }
    :nth-last-child(1) {
      padding-bottom: 0;
    }
  }
`;
