import { Image, Header } from 'semantic-ui-react';
import CustomLink from 'Components/CustomLink';
import React from 'react';
import styled from 'styled-components';

import calendarIcon from 'Assets/icons/icon-tabbar-today.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding: 1.375rem 0;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomHeader = styled(Header)`
  &&& {
    margin: 0;
  }
`;

const Availability = ({ angelId }) => {
  return (
    <Container>
      <CustomHeader as="h5">Availability</CustomHeader>
      <LinkContainer>
        <CustomLink
          fontSize="0.875rem"
          to={`/calendar/availability/${angelId}`}
        >
          View calendar
        </CustomLink>{' '}
        <Image avatar src={calendarIcon} />
      </LinkContainer>
    </Container>
  );
};

export default Availability;
