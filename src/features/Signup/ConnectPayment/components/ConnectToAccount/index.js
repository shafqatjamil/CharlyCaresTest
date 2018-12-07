import React from 'react';
import styled from 'styled-components';
import visa from 'Assets/images/visa.png';
import adyen from 'Assets/images/adyen.png';
import BasicButton from 'Components/Buttons/Basic';

const Container = styled.div`
  padding: 1.25rem;
`;

const Heading = styled.h2`
  font-size: 1rem;
`;

const Desc = styled.p`
  font-weight: 300;
  font-size: 0.9375rem;
`;
const AdyenDesc = styled.p`
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.gray};
  margin-bottom: 1.25rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const AdyenImg = styled.img`
  height: 3.0625rem;
`;

const VisaImg = styled.img`
  height: 1.875rem;
`;

const ConnectToAccount = ({ link }) => {
  return (
    <Container>
      <Heading>Connect your bank account</Heading>
      <Desc>
        We need to connect your bank account once to pay out the babysitter.
      </Desc>
      <ImagesContainer>
        <AdyenImg src={adyen} />
        <VisaImg src={visa} />
      </ImagesContainer>
      <AdyenDesc>
        Adyen is our payment provider, and they are able to connect your bank
        account safely. There will be charged € 0,02 to verify your bank
        account.
      </AdyenDesc>
      <BasicButton as="a" href={link} primary fluid>
        Connect
      </BasicButton>
    </Container>
  );
};

export default ConnectToAccount;
