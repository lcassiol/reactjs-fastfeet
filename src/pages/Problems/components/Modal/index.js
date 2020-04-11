import React from 'react';
import PropTypes from 'prop-types';

import Modal from '~/components/Form/Modal';
import { Container } from './styles';

export default function DeliveryModal({ data }) {
  return (
    <Modal>
      <Container>
        <div>
          <strong>VISUALIZAR PROBLEMA</strong>
          <small>{data.description}</small>
        </div>
      </Container>
    </Modal>
  );
}

DeliveryModal.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
};
