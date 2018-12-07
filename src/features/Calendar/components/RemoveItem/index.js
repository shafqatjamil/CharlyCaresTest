import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import deleteIcon from 'Assets/icons/btn-trash.svg';

const RemoveItem = ({ topBorder, onClick }) => {
  return (
    <Container onClick={onClick} topBorder={topBorder}>
      <div>
        <Icon src={deleteIcon} />
      </div>
      <Text>
        <FormattedMessage id="calendar.angel.removeItem" />
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1.25rem 0;
  ${props => props.topBorder && 'border-top: 1px solid #e6e6e6;'};
`;

const Icon = styled.img`
  margin-right: 0.5rem;
`;

const Text = styled.div`
  font-family: ${props => props.theme.primaryFont};
  color: ${props => props.theme.secondaryColor};
  font-weight: 600;
`;

export default RemoveItem;
