import React from 'react';
import styled from 'styled-components';

import checkIcon from 'Assets/icons/btn-check-on.svg';
import addIcon from 'Assets/icons/btn-check-off.svg';

import PaymentItem from '../../../components/PaymentItem';

const ListItem = ({ sum, description, date, paymentDesc, selected }) => {
  return (
    <ListItemContainer>
      <PaymentItem
        div
        withButton
        divider
        sum={sum}
        description={description}
        date={date}
        paymentDesc={paymentDesc}
      />
      <Button>
        <Icon src={selected ? checkIcon : addIcon} />
      </Button>
    </ListItemContainer>
  );
};

const ListItemContainer = styled.li`
  display: flex;
  width: 100%;

  & > div {
    padding-right: 0;
  }

  &:last-child > div:after {
    display: none;
  }
`;

const Button = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Icon = styled.img`
  width: 44px;
  height: 44px;
`;

export default ListItem;
