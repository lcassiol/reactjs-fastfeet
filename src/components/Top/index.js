import React from 'react';

import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function Top({ title, children }) {
  return (
    <Container>
      <h1>{title}</h1>

      {children && <Content>{children}</Content>}
    </Container>
  );
}

Top.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

Top.defaultProps = {
  children: null,
};
