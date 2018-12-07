import React from 'react';
import styled from 'styled-components';

const Image = styled.img``;

const Wrapper = styled.a`
  margin-right: 1rem;
  padding: 0;
  border: 0;
  background: transparent;

  &:last-child {
    margin-right: 0;
  }
`;

const WrapperAsButton = styled.button`
  margin-right: 1rem;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const NavIcons = ({ phone, onClick, activeIcon, disabledIcon }) => {
  return phone ? (
    <Wrapper href={`tel:${phone}`}>
      <Image avatar src={phone ? activeIcon : disabledIcon} />
    </Wrapper>
  ) : (
    <WrapperAsButton onClick={onClick}>
      <Image avatar src={onClick ? activeIcon : disabledIcon} />
    </WrapperAsButton>
  );
};

export default NavIcons;
