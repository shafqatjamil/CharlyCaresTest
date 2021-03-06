import React from 'react';
import styled from 'styled-components';

import addIcon from 'Assets/icons/book-action-btn.svg';

const Icon = styled.img``;

const Container = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 0.9375rem;
  margin-left: 0.5rem;
`;

const AddBookingBtn = () => (
  <Container>
    <Icon src={addIcon} />
    <Text>Add new booking</Text>
  </Container>
);

export default AddBookingBtn;
