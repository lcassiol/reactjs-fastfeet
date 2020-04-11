import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/Button/MoreOptions';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, MoreContainer } from './styles';

export default function RecipientItem({ data, loadRecipients }) {
  async function handleDelete() {
    const confirm = window.confirm('Você tem certeza que deseja remover?');

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/recipients/${data.id}`);
      toast.success('Destinatário apagado com sucesso!');
      loadRecipients('');
    } catch (err) {
      toast.error('Destinatário não pode ser removido! Veja os logs');
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.name}</small>
      <small>
        {data.street}, {data.number}, {data.city} - {data.state}
      </small>
      <More>
        <MoreContainer>
          <div>
            <button
              onClick={() => history.push(`/recipients/edit/${data.id}`)}
              type="button"
            >
              <MdEdit color={colors.info} size={15} />
              <span>Editar</span>
            </button>
          </div>
          <div>
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Excluir</span>
            </button>
          </div>
        </MoreContainer>
      </More>
    </Container>
  );
}

RecipientItem.propTypes = {
  updateDeliveries: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  }).isRequired,
};
