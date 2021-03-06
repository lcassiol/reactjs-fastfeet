import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import BackButton from '~/components/Button/BackButton';
import SaveButton from '~/components/Button/SaveButton';

import Input from '~/components/Form/Input';
import Header from '~/components/Form/Header';
import AvatarInput from '~/components/Form/AvatarInput';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Form } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do entregador é obrigatório'),
  email: Yup.string().required('O email do entregador é obrigatório'),
});

export default function NewOrEditDeliveryMan({ match }) {
  const { id } = match.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      const { data: response } = await api.get(`/deliveryman/${deliveryId}`);
      const { name, email, avatar } = response;
      setName(name);
      setEmail(email);

      if (avatar) {
        setAvatar(avatar.id);
        setAvatarUrl(avatar.url);
      }
    }
    if (id) {
      loadInitialData(id);
    }
  }, [id]);

  async function handleSubmit() {
    const data = {
      name,
      email,
    };

    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      setFormErrors([]);

      if (avatar) {
        data.avatar_id = avatar;
      }

      if (id) {
        await api.put(`/deliveryman/${id}`, data);
        history.push('/deliveryman');
        toast.success('Entregador editado com sucesso!');
      } else {
        await api.post('/deliveryman', data);
        history.push('/deliveryman');
        toast.success('Entregador criado com sucesso!');
      }
    } catch (err) {
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
        <Header title="Cadastro de entregadores">
          <BackButton iconSize={25} path="/deliveryman" />
          <SaveButton action={handleSubmit} iconSize={25} />
        </Header>
        <Form>
          <AvatarInput
            onChangeAvatar={(imageId) => {
              setAvatar(imageId);
            }}
            name="avatar"
            imageUrl={avatarUrl}
          />
          <Input
            label="Nome"
            name="name"
            error={formErrors['name']}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Nome do entregador"
          />
          <Input
            label="Email"
            name="email"
            error={formErrors['email']}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="exemplo@fastfeet.com"
            onKeyPress={() => {}}
          />
        </Form>
      </Content>
    </Container>
  );
}

NewOrEditDeliveryMan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
