import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import { Container, Content, HeaderButton } from './styles';

export default function Header() {
  const userName = useSelector((state) => state.user.profile.name);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="deliveries">
            <img src={logo} alt="FastFeet" />
          </Link>
          <HeaderButton to="/deliveries" active={true ? 1 : 0}>
            ENCOMENDAS
          </HeaderButton>
          <HeaderButton to="/deliveryman">ENTREGADORES</HeaderButton>
          <HeaderButton to="/recipients">DESTINATÁRIOS</HeaderButton>
          <HeaderButton to="/delivery-problems">PROBLEMAS</HeaderButton>
        </nav>

        <aside>
          <strong>{userName}</strong>
          <a href="#">sair do sistema</a>
        </aside>
      </Content>
    </Container>
  );
}
