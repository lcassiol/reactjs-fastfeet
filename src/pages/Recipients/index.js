import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import api from '~/services/api';

import Top from '~/components/Top';
import SearchInput from '~/components/Form/SearchInput';
import IconButton from '~/components/Button/IconButton';
// import { Container } from './styles';

export default function Recipients() {
  const history = useHistory();

  function handleSearch() {}

  return (
    <>
      <Top title="Gerenciando destinatários">
        <SearchInput
          onChange={handleSearch}
          type="text"
          placeholder="Buscar por destinatários"
        />
        <IconButton
          Icon={MdAdd}
          title="CADASTRAR"
          action={() => history.push('/recipients/new')}
          type="button"
        />
      </Top>
    </>
  );
}
