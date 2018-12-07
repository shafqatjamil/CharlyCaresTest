import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import homeIcon from 'Assets/icons/icn-feature-house.svg';

import EditButton from '../../../components/EditButton';

class Address extends React.PureComponent {
  state = {
    isAddressEdited: false,
  };

  addressInput = React.createRef();

  onAddressEdit = () => {
    this.setState(
      {
        isAddressEdited: true,
      },
      () => {
        this.addressInput.current.focus();
      }
    );
  };

  onAddressBlur = () => {
    this.setState({
      isAddressEdited: false,
    });
  };

  render() {
    const { address, city, onAddressChange } = this.props;
    return (
      <Container>
        <Heading>
          <FormattedMessage id="profile.family.edit.address" />
        </Heading>
        <AddressContainer>
          <Icon src={homeIcon} />
          <div>
            <Street
              innerRef={this.addressInput}
              disabled={!this.state.isAddressEdited}
              onChange={onAddressChange('address')}
              value={address}
            />
            <Place
              onBlur={this.onAddressBlur}
              disabled={!this.state.isAddressEdited}
              onChange={onAddressChange('city')}
              value={city}
            />
          </div>
          <EditButton onClick={this.onAddressEdit} />
        </AddressContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: ${isMobile ? '1.25rem 1rem 1.25rem' : '1.25rem 0 1.25rem'};
`;

const Heading = styled.h2`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
`;

const Street = styled.input`
  font-family: ${props => props.theme.secondaryFont};
  font-size: 0.9375rem;
  border: 0;
  width: 90%;

  &:focus {
    outline: 0;
  }
`;

const Place = styled.input`
  font-family: ${props => props.theme.secondaryFont};
  font-weight: 300;
  font-size: 0.875rem;
  border: 0;
  width: 90%;

  &:focus {
    outline: 0;
  }
`;

export default Address;
