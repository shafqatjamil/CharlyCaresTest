import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import FamilyContact from '../FamilyContact';

const ListItem = ({ family, angelId }) => {
  return (
    <Wrapper>
      <FamilyContact
        phone={family.phone}
        id={angelId}
        name={`Fam. ${family.last_name}`}
        img={family.image}
        familyId={family.family_id}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 0.875rem 0 0.375rem ${isMobile ? 0 : 0.5}rem;
  background: #fff;
  ${!isMobile &&
    `
  border-radius: 0.3125rem;
  margin-top: 0.375rem;
  border: 1px solid #e6e6e6; `} ${isMobile &&
    `
    &:first-child {
      padding-top: 0;
    }
    
    &::after {
    position: absolute;
    content: '';
    background-color: #f9f8f9;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    height: 0.375rem;
    width: ${isMobile ? 'calc(100% + 2rem)' : '100%'};
    bottom: 0;
    left: ${isMobile ? '-1rem' : '0'};
  }
      `} &:last-child::after {
    display: none;
  }
`;

export default ListItem;
