import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, HeaderButton } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.profile.name);

  function handleSingOut() {
    dispatch(signOut());
  }

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
          <button type="button" onClick={handleSingOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
