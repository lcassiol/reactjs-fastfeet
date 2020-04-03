import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 20px 30px;
  flex: 1;
  height: 64px;
  border: 1px solid #dddddd;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      height: 23px;
      width: 130px;
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    strong {
      color: #666666;
      font-size: 12px;
      margin-top: -5px;
    }

    a {
      color: #de3b3b;
      font-size: 12px;
      margin-top: 5px;
    }
  }
`;

export const HeaderButton = styled(Link)`
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => (props.active ? '#444444' : '#999999')};

  & + a {
    margin-left: 21px;
  }
`;