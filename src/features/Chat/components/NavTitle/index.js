import React from 'react';
import styled from 'styled-components';
import WithRole from 'Components/WithRole';
import { FormattedMessage } from 'react-intl';

const NavTitle = ({ name, img }) => {
  return (
    <Container>
      {img && <CustomImage src={img} />}
      <WithRole>
        {role => {
          if (role === 'angel') {
            return (
              <Name>
                <FormattedMessage
                  id="chat.angel.familyName"
                  values={{ name }}
                />
              </Name>
            );
          }
          return <Name>{name}</Name>;
        }}
      </WithRole>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
`;

const CustomImage = styled.img`
  width: 2.5625rem;
  height: 2.5625rem;
  border: 1px solid ${props => props.theme.defaultGrey};
  border-radius: 50%;
`;

const Name = styled.div`
  font-size: 1rem;
  margin-left: 0.3125rem;
  line-height: 1.6;
`;

export default NavTitle;
