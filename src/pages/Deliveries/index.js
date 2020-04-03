import React from 'react';

import api from '~/services/api';
// import { Container } from './styles';

export default function Deliveries() {
  api.get('delivery');
  return <h1>Deliveries</h1>;
}
