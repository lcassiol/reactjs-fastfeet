import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import BackButton from '~/components/Button/BackButton';
import SaveButton from '~/components/Button/SaveButton';

import Input from '~/components/Form/Input';
import Header from '~/components/Form/Header';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Content,
  Form,
  CityStateCEP,
  StreetNumberAditional,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do entregador é obrigatório'),
  street: Yup.string().required('A rua é obrigatória'),
  number: Yup.string().required('O número é obrigatório'),
  aditional: Yup.string(),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado deve ser informado'),
  postal_code: Yup.string().required('O CEP é obrigatório'),
});

export default function NewOrEditRecipient({ match }) {
  const { id } = match.params;

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [aditional, setAditional] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      const { data: response } = await api.get(`/recipients/${deliveryId}`);
      const {
        name,
        street,
        number,
        aditional,
        city,
        state,
        postal_code,
      } = response;

      // set values
      setName(name);
      setStreet(street);
      setNumber(number);
      setAditional(aditional);
      setCity(city);
      setState(state);
      setPostalCode(postal_code);
    }
    if (id) {
      loadInitialData(id);
    }
  }, [id]);

  async function handleSubmit() {
    const data = {
      name,
      street,
      number,
      aditional,
      city,
      state,
      postal_code: postalCode,
    };

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      setFormErrors([]);

      if (id) {
        await api.put(`/recipients/${id}`, data);
        history.push('/recipients');
        toast.success('Destinatário editado com sucesso!');
      } else {
        await api.post('/recipients', data);
        history.push('/recipients');
        toast.success('Destinatário criado com sucesso!');
      }
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errorMessages = [];

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        setFormErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header title="Cadastro de destinatário">
          <BackButton iconSize={25} path="/recipients" />
          <SaveButton action={handleSubmit} iconSize={25} />
        </Header>
        <Form>
          <Input
            label="Nome"
            name="name"
            error={formErrors['name']}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Fastman destinatário example"
          />
          <StreetNumberAditional>
            <Input
              label="Rua"
              name="street"
              error={formErrors['street']}
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
              type="text"
              placeholder="Rua de exemplo"
            />
            <Input
              label="Número"
              name="number"
              error={formErrors['number']}
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              type="text"
              placeholder="123"
            />
            <Input
              label="Complemento"
              name="aditional"
              error={formErrors['aditional']}
              value={aditional}
              onChange={(e) => {
                setAditional(e.target.value);
              }}
              type="text"
            />
          </StreetNumberAditional>
          <CityStateCEP>
            <Input
              label="Cidade"
              name="city"
              error={formErrors['city']}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              type="text"
              placeholder="Recife"
            />
            <Input
              label="Estado"
              name="state"
              error={formErrors['state']}
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              type="text"
              placeholder="Pernambuco"
            />
            <Input
              label="CEP"
              name="postal-code"
              error={formErrors['postal_code']}
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
              maxLength="9"
              type="text"
              placeholder="09960-580"
              onKeyPress={() => {}}
            />
          </CityStateCEP>
        </Form>
      </Content>
    </Container>
  );
}

NewOrEditRecipient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
