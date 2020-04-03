import React from 'react';

import logo from '~/assets/logo.png';
import { Container, Content, HeaderButton } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <HeaderButton to="/deliveries" active={true ? 1 : 0}>
            ENCOMENDAS
          </HeaderButton>
          <HeaderButton to="/deliveryman">ENTREGADORES</HeaderButton>
          <HeaderButton to="/recipient">DESTINATÁRIOS</HeaderButton>
          <HeaderButton to="/delivery-problems">PROBLEMAS</HeaderButton>
        </nav>

        <aside>
          <strong>Admin fastFeet</strong>
          <a href="#">sair do sistema</a>
        </aside>
      </Content>
    </Container>
  );
}
