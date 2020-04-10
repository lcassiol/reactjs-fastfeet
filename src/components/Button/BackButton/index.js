import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import IconButton from '../IconButton';

export default function BackButton({ iconSize, path }) {
  return (
    <IconButton
      title="VOLTAR"
      Icon={MdKeyboardArrowLeft}
      action={() => history.push(path)}
      background="#CCCCCC"
      iconSize={iconSize}
    />
  );
}
