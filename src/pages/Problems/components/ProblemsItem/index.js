import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/Button/MoreOptions';
import Modal from '../Modal';
import api from '~/services/api';

import { colors } from '~/styles/colors';

import { Container, MoreContainer } from './styles';

export default function ProblemsItem({ data, loadProblems }) {
  let description = data.description.substring(0, 80);
  description += data.description.length > 80 ? '...' : '';

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
      <small>{description}</small>
      <More dialogWidth={'208px'}>
        <MoreContainer>
          <div>
            <Modal data={data} />
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
