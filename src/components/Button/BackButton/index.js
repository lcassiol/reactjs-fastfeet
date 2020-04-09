import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import IconButton from '../IconButton';

export default function BackButton({ iconSize }) {
  return (
    <IconButton
      title="VOLTAR"
      Icon={MdKeyboardArrowLeft}
      action={history.goBack}
      background="#CCCCCC"
      iconSize={iconSize}
    />
  );
}
