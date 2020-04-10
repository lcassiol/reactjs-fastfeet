import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import BackButton from '~/components/Button/BackButton';
import SaveButton from '~/components/Button/SaveButton';
import AsyncSelectInput from '~/components/Form/AsyncSelectInput';
import Input from '~/components/Form/Input';
import Header from '~/components/Form/Header';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Form } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('O nome do produto é obrigatório'),
  recipient: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string(),
    })
    .required('O destinatário é obrigatório'),
  deliveryMan: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string(),
    })
    .required('O entregador é obrigatório'),
});

const customStylesSelectInput = {
  control: (provided) => ({
    ...provided,
    height: 45,
  }),
};

export default function NewOrEditDelivery({ match }) {
  const { id } = match.params;

  const [product, setProduct] = useState('');
  const [recipient, setRecipient] = useState('');
  const [deliveryMan, setDeliveryMan] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      const { data: response } = await api.get(`/delivery/${deliveryId}`);

      console.log(response);
      setProduct(response.product);
      setRecipient({
        value: response.recipient.id,
        label: response.recipient.name,
      });
      setDeliveryMan({
        value: response.deliveryman.id,
        label: response.deliveryman.name,
      });
      //setar os campos recipient deliveryman e product
    }
    if (id) {
      loadInitialData(id);
    }
  }, [id]);

  async function loadRecipientOptions(inputValue) {
    const response = await api.get('/recipients', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map((recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));

    return data;
  }

  async function loadDeliverymenSelect(inputValue) {
    const response = await api.get('/deliveryman', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map((deliveryman) => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));

    return data;
  }

  async function handleSubmit() {
    const data = {
      product,
      deliveryMan,
      recipient,
    };

    console.log(data);

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      setFormErrors([]);

      if (id) {
        await api.put(`/delivery/${id}`, {
          product: data.product,
          recipient_id: data.recipient.value,
          deliveryman_id: data.deliveryMan.value,
        });
        history.push('/deliveries');
        toast.success('Encomenda editada com sucesso!');
      } else {
        await api.post('/delivery', {
          product: data.product,
          recipient_id: data.recipient.value,
          deliveryman_id: data.deliveryMan.value,
        });
        history.push('/deliveries');
        toast.success('Encomenda criada com sucesso!');
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

  function onChangeRecipient(selectedValue) {
    setRecipient(selectedValue);
  }

  function onChangeDeliveryMan(selectedValue) {
    setDeliveryMan(selectedValue);
  }

  return (
    <Container>
      <Content>
        <Header title="Cadastro de encomendas">
          <BackButton iconSize={25} />
          <SaveButton action={handleSubmit} iconSize={25} />
        </Header>
        <Form>
          <section>
            <AsyncSelectInput
              type="text"
              error={formErrors['recipient']}
              label="Destinatário"
              name="recipient"
              onChange={onChangeRecipient}
              value={recipient}
              placeholder="Destinatários"
              noOptionsMessage={() => 'Nenhum destinatário encontrado'}
              loadOptions={loadRecipientOptions}
              styles={customStylesSelectInput}
            />
            <AsyncSelectInput
              type="text"
              error={formErrors['deliveryMan']}
              label="Entregador"
              name="deliveryman"
              onChange={onChangeDeliveryMan}
              value={deliveryMan}
              placeholder="Entregadores"
              noOptionsMessage={() => 'Nenhum entregador encontrado'}
              loadOptions={loadDeliverymenSelect}
              styles={customStylesSelectInput}
            />
          </section>
          <Input
            label="Nome do produto"
            name="product"
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
            }}
            error={formErrors['product']}
            type="text"
            placeholder="Nome do produto"
            onKeyPress={(e) => {}}
          />
        </Form>
      </Content>
    </Container>
  );
}

NewOrEditDelivery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
