import React from 'react';
import styled from 'styled-components';

import backArrow from 'Assets/icons/back.svg';
import closeIcon from 'Assets/icons/close.svg';

const Container = styled.div`
  min-width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
  margin: ${props => (props.withBorder ? 0 : '0 -1rem')};
  border-top-right-radius: 0.3125rem;
  border-top-left-radius: 0.3125rem;
  padding: ${props =>
    props.subtitle ? '0.45rem 1rem' : props.noPadding ? 0 : '0.9rem 1rem'};
  background: ${props => (props.isWhite ? '#fff' : null)};
  border: ${props =>
    props.withBorder ? `1px solid ${props.theme.defaultGrey}` : null};
`;

const Left = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1.5;
`;

const Right = styled.div`
  flex: 0.5;
  text-align: right;
`;
const Button = styled.button`
  border: 0;
  cursor: pointer;
  background: transparent;
  &:focus {
    outline: 0;
  }
`;
const Title = styled.div`
  font-size: 1.125rem;
  font-family: ${({ theme }) => theme.primaryFont};
  font-weight: 600;
  display: flex;
  justify-content: center;
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 0.8125rem;
  font-family: ${({ theme }) => theme.secondaryFont};
  font-weight: 400;
  color: ${({ theme }) => theme.lightGrey};
  text-align: center;
  width: 100%;
`;

const Navigation = ({
  onBack,
  onClose,
  title,
  subTitle,
  centerComp,
  rightComp,
  isWhite,
  withBorder,
  noPadding,
}) => (
  <Container
    subtitle={Boolean(subTitle)}
    withBorder={withBorder}
    isWhite={isWhite}
    noPadding={noPadding}
  >
    <Left>
      {onBack && typeof onBack === 'function' ? (
        <Button onClick={onBack}>
          <img src={backArrow} alt="Back arrow" />
        </Button>
      ) : null}
      {onClose && typeof onClose === 'function' ? (
        <Button onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </Button>
      ) : null}
    </Left>
    <Center>
      {title ? <Title>{title}</Title> : null}
      {title ? <SubTitle>{subTitle}</SubTitle> : null}
    </Center>
    <Right>{typeof rightComp === 'function' ? rightComp() : rightComp}</Right>
  </Container>
);

export default Navigation;
