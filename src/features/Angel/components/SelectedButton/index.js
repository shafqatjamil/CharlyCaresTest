import { Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';

const CustomIcon = styled(Icon)`
  &&& {
    position: absolute;
    right: 0.5rem;
  }
`;

const SelectedButton = ({ selected, onClick, ...props }) => {
  return (
    <BasicButton padding="0.6875rem 4rem" primary {...props} onClick={onClick}>
      {selected ? (
        <FormattedMessage id="booking.angel.selected" />
      ) : (
        <FormattedMessage id="booking.angel.addAngel" />
      )}
      {!selected ? <CustomIcon name="plus" /> : null}
    </BasicButton>
  );
};

export default SelectedButton;
