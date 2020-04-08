import React, { useState, useEffect } from 'react';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import api from '~/services/api';

import Top from '~/components/Top';
import SearchInput from '~/components/Form/SearchInput';
import IconButton from '~/components/Button/IconButton';

import RecipientItem from './components/RecipientItem';

import { Grid, Button, PaginationControl } from './styles';

export default function Recipients() {
  const history = useHistory();

  const [recipients, setRecipients] = useState([]);
  const [endList, setEndList] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadRecipients();
  }, [page]);

  function handleSearch() {}

  async function loadRecipients() {
    const response = await api.get('/recipients', {
      params: {
        page,
      },
    });

    if (page >= 1 && response.data.length < 5) {
      setEndList(true);
    }

    if (page == 1 && response.data.length == 5) {
      setEndList(false);
    }

    setRecipients(response.data);
  }

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
          action={() => history.push('/deliveryman/new')}
          type="button"
        />
      </Top>

      <Grid>
        <section>
          <strong>ID</strong>
          <strong>Nome</strong>
          <strong>Endereço</strong>
          <strong>Ações</strong>
        </section>
        {recipients.map((recipient) => (
          <RecipientItem
            updateRecipient={loadRecipients}
            key={recipient.id}
            data={recipient}
          />
        ))}
      </Grid>
      <PaginationControl>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          type="button"
        >
          <MdChevronLeft size={45} />
        </Button>
        <Button
          disabled={endList}
          type="button"
          onClick={() => setPage(page + 1)}
        >
          <MdChevronRight size={45} />
        </Button>
      </PaginationControl>
    </>
  );
}
