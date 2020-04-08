import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/Button/MoreOptions';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, MoreContainer } from './styles';

export default function RecipientItem({ data, updateDeliveries }) {
  async function handleDelete() {
    const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

    if (!confirm) {
      toast.error('Encomenda não apagada!');
      return;
    }

    try {
      await api.delete(`/deliveries/${data.id}`);
      updateDeliveries();
      toast.success('Encomenda apagada com sucesso!');
    } catch (err) {
      toast.error('Essa encomenda não pode ser deletada!');
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
              onClick={() => history.push(`/deliveryman/form/${data.id}`)}
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
