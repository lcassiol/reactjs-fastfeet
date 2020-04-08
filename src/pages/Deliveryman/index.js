import React, { useState, useEffect } from 'react';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import api from '~/services/api';

import Top from '~/components/Top';
import SearchInput from '~/components/Form/SearchInput';
import IconButton from '~/components/Button/IconButton';

import DeliveryManItem from './components/DeliveryManItem';

import { Grid, Button, PaginationControl } from './styles';

export default function Deliveryman() {
  const history = useHistory();

  const [couriers, setCouriers] = useState([]);
  const [endList, setEndList] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadCouriers();
  }, [page]); //eslint-disable-line

  function handleSearch() {}

  async function loadCouriers() {
    const response = await api.get('/deliveryman', {
      params: {
        page,
      },
    });

    if (page >= 1 && response.data.length < 5) {
      setEndList(true);
    }

    if (page === 1 && response.data.length === 5) {
      setEndList(false);
    }

    setCouriers(response.data);
  }

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
          action={() => history.push('/deliveryman/new')}
          type="button"
        />
      </Top>

      <Grid>
        <section>
          <strong>ID</strong>
          <strong>Foto</strong>
          <strong>Nome</strong>
          <strong>Email</strong>
          <strong>Ações</strong>
        </section>
        {couriers.map((courier) => (
          <DeliveryManItem
            updateDeliveryman={loadCouriers}
            key={courier.id}
            data={courier}
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
