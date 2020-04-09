import React from 'react';

import PropTypes from 'prop-types';

import Button from './styles';

export default function IconButton({
  title,
  Icon,
  action,
  background,
  iconSize,
  ...rest
}) {
  return (
    <Button onClick={action} background={background} {...rest}>
      <Icon color="#fff" size={iconSize || 16} />
      {title}
    </Button>
  );
}

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  background: PropTypes.string,
};

IconButton.defaultProps = {
  background: '',
};
