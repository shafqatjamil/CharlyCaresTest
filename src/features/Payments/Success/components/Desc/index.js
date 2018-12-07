import React from 'react';
import styled from 'styled-components';
import { Paragraph } from 'Components/Text';

const Container = styled.div`
  padding: 0 1.25rem 1.5rem;
`;

const Heading = styled.h2`
  font-size: 1rem;
`;

const Desc = () => (
  <Container>
    <Heading>Thank you for your payment</Heading>
    <Paragraph fontSize="0.9375rem" light>
      The payment of €138.25 will now be processed. Is this not correct? You can
      correct the payment within 2 hours in the payment overview.
    </Paragraph>
  </Container>
);

export default Desc;
