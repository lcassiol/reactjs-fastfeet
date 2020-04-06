import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import Top from '~/components/Top';
import SearchInput from '~/components/Form/SearchInput';
import IconButton from '~/components/Button/IconButton';

// import { Container } from './styles';

export default function Deliveryman() {
  const history = useHistory();

  function handleSearch() {}

  return (
    <>
      <Top title="Gerenciando entregadores">
        <SearchInput
          onChange={handleSearch}
          type="text"
          placeholder="Buscar por entregadores"
        />
        <IconButton
          Icon={MdAdd}
          title="CADASTRAR"
          action={() => history.push('/deliveries/new')}
          type="button"
        />
      </Top>
    </>
  );
}
