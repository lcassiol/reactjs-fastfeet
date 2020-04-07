import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import random from 'randomcolor';
import { complement, lighten } from 'polished';

import PropTypes from 'prop-types';

import More from '~/components/Button/MoreOptions';
import api from '~/services/api';
import history from '~/services/history';
import { statusColors, colors } from '~/styles/colors';

import Modal from '../Modal';
import Status from '../DeliveryStatus';
import { Container, MoreConainer, Initials } from './styles';

export default function DeliveryItem({ data, updateDeliveries }) {
  const randomColor = random({ luminosity: 'dark' });
  const backgroundColor = lighten(0.5, complement(randomColor));

  const deliveryManInitials = data.deliveryman.name
    .split(' ')
    .map((n) => n[0])
    .join('');

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
      <small>{data.recipient.name}</small>
      <small>
        <Initials style={{ color: randomColor, background: backgroundColor }}>
          {deliveryManInitials}
        </Initials>
        {data.deliveryman.name}
      </small>
      <small>{data.recipient.city}</small>
      <small>{data.recipient.state}</small>
      <Status
        text={data.status}
        color={statusColors[data.status].color}
        background={statusColors[data.status].background}
      />
      <More>
        <MoreConainer>
          <div>
            <Modal data={data} />
          </div>
          <div>
            <button
              onClick={() => history.push(`/deliveries/form/${data.id}`)}
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
        </MoreConainer>
      </More>
    </Container>
  );
}

DeliveryItem.propTypes = {
  updateDeliveries: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};
