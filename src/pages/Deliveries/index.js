import React, { useState, useEffect } from 'react';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

import api from '~/services/api';

import Top from '~/components/Top';
import SearchInput from '~/components/Form/SearchInput';
import IconButton from '~/components/Button/IconButton';

import DeliveryItem from './components/DeliveryItem';

import { Grid, Button, PaginationControl } from './styles';

export default function Deliveries() {
  const history = useHistory();

  const [deliveries, setDeliveries] = useState([]);
  const [endList, setEndList] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadDeliveries();
  }, [page]); //eslint-disable-line

  function formatDates(data) {
    return data.map((delivery) => ({
      ...delivery,
      start_dateFormated: delivery.start_date
        ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
        : null,
      end_dateFormated: delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : null,
    }));
  }

  function handleSearch(e) {
    if (e.target.value.length > 3) {
      setPage(1);
      loadDeliveries(e.target.value);
    } else if (e.target.value.length === 0) {
      setPage(1);
      loadDeliveries('');
    }
  }

  async function loadDeliveries(searchText) {
    const response = await api.get('/delivery', {
      params: {
        page,
        q: searchText,
      },
    });

    if (page >= 1 && response.data.length < 5) {
      setEndList(true);
    }

    if (page === 1 && response.data.length === 5) {
      setEndList(false);
    }

    const data = formatDates(response.data);

    setDeliveries(data);
  }

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
          iconSize={25}
          title="CADASTRAR"
          action={() => history.push('/deliveries/new')}
          type="button"
        />
      </Top>

      <Grid>
        <section>
          <strong>ID</strong>
          <strong>Destinatário</strong>
          <strong>Entregador</strong>
          <strong>Cidade</strong>
          <strong>Estado</strong>
          <strong>Status</strong>
          <strong>Ações</strong>
        </section>
        {deliveries.map((delivery) => (
          <DeliveryItem
            updateDeliveries={loadDeliveries}
            key={delivery.id}
            data={delivery}
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
