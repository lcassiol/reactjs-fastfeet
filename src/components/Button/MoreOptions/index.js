import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import Popup from 'reactjs-popup';

import PropTypes from 'prop-types';

import { PopUpButton } from './styles';

export default function MoreOptionsPopUp({ children, dialogWidth, ...rest }) {
  return (
    <Popup
      trigger={
        <PopUpButton type="button">
          <MdMoreHoriz color="#C6C6C6" size={25} />
        </PopUpButton>
      }
      position="bottom center"
      contentStyle={{
        width: dialogWidth || '150px',
        borderRadius: '4px',
      }}
      {...rest}
    >
      {children}
    </Popup>
  );
}

MoreOptionsPopUp.propTypes = {
  children: PropTypes.element.isRequired,
};
