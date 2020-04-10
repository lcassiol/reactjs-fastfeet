import React, { useState } from 'react';
import { MdInsertPhoto } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';
import api from '~/services/api';

export default function AvatarInput({ name, onChangeAvatar, ...rest }) {
  const [preview, setPreview] = useState('');

  const handlePreview = async (e) => {
    const file = e.target.files[0];

    const data = new FormData();
    data.append('file', file);

    const response = await api.post('/files', data);
    const { id, url } = response.data;

    setPreview(url);
    onChangeAvatar(id);
  };

  return (
    <Container>
      <Content htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="Preview" width="150" />
        ) : (
          <>
            <MdInsertPhoto size={40} color="#ddd" />
            <strong>Adicionar foto</strong>
          </>
        )}
        <input
          id="avatar"
          type="file"
          name="file"
          {...rest}
          onChange={handlePreview}
        />
      </Content>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};
