import React from 'react';
import { MdDone } from 'react-icons/md';

import PropTypes from 'prop-types';

import IconButton from '../IconButton';

export default function SaveButton({ action, iconSize }) {
  return (
    <IconButton
      title="SALVAR"
      Icon={MdDone}
      action={action}
      iconSize={iconSize}
    />
  );
}

SaveButton.propTypes = {
  action: PropTypes.func.isRequired,
  iconSize: PropTypes.number,
};
