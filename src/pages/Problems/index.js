import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import api from '~/services/api';

import ProblemItem from './components/ProblemsItem';

import { Grid, Button, PaginationControl } from './styles';

export default function Problems() {
  const history = useHistory();

  const [problems, setProblems] = useState([]);
  const [nextPageEmpty, setNextPageEmpty] = useState(false);
  const [endList, setEndList] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProblems();
  }, [page]);

  function handleSearch() {}

  async function loadProblems() {
    const response = await api.get('/delivery-problems', {
      params: {
        page,
      },
    });

    if (page > 1 && response.data.length === 0) {
      setEndList(true);
      setNextPageEmpty(true);
      setPage(page - 1);
      return;
    }

    if (page >= 1 && response.data.length < 5) {
      setEndList(true);
    }

    if (page === 1 && response.data.length === 5) {
      if (!nextPageEmpty) {
        setEndList(false);
      }
    }

    setProblems(response.data);
  }

  return (
    <>
      <Grid>
        <section>
          <strong>Encomenda</strong>
          <strong>Problema</strong>
          <strong>Ações</strong>
        </section>
        {problems.map((problem) => (
          <ProblemItem key={problem.id} data={problem} />
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
