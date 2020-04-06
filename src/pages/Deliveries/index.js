import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import api from '~/services/api';

import Top from '~/components/Top';
import SearchInput from '~/components/Form/SearchInput';
import IconButton from '~/components/Button/IconButton';
// import { Container } from './styles';

export default function Deliveries() {
  const history = useHistory();

  function handleSearch() {}

  return (
    <>
      <Top title="Gerenciando encomendas">
        <SearchInput
          onChange={handleSearch}
          type="text"
          placeholder="Buscar por encomendas"
        />
        <IconButton
          Icon={MdAdd}
          title="CADASTRAR"
          action={() => history.push('/deliveryman/new')}
          type="button"
        />
      </Top>
    </>
  );
}
