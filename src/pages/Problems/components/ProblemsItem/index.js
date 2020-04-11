import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/Button/MoreOptions';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, MoreContainer } from './styles';

export default function ProblemsItem({ data, loadProblems }) {
  async function handleDelete() {
    const confirm = window.confirm(
      'Você tem certeza que deseja cancelar esta entrega?'
    );

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/problem/${data.id}/cancel-delivery`);
      loadProblems();
      toast.success('Entrega cancelada com sucesso!');
    } catch (err) {
      toast.error('Esta entrega nao pôde ser cancelada!');
    }
  }

  return (
    <Container>
      <small>#{data.delivery.id}</small>
      <small>{data.description}</small>
      <More>
        <MoreContainer>
          <div>
            <button
              onClick={() => history.push(`/deliveryman/form/${data.id}`)}
              type="button"
            >
              <MdEdit color={colors.info} size={15} />
              <span>Visualizar</span>
            </button>
          </div>
          <div>
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Cancelar encomenda</span>
            </button>
          </div>
        </MoreContainer>
      </More>
    </Container>
  );
}

ProblemsItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};
