import React from 'react';
import styled from 'styled-components';

import arrowRightIcon from 'Assets/icons/btn-large-arrow-right.svg';

const navigateTo = (to) => () => {
  if(to)
    window.open(to, '_blank');
};

const ListItem = ({ option, to, path }) => (
  <Container onClick={navigateTo(to)}>
    <Name>{option}</Name>
    <Icon src={arrowRightIcon} />
  </Container>
);

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1875rem 0;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
`;

const Icon = styled.img``;

const Name = styled.div`
  font-weight: 300;
  font-size: 1.0625rem;
`;

export default ListItem;
