import { FormattedMessage } from 'react-intl';
import WithRole from 'Components/WithRole';
import AddButton from 'Components/Buttons/AddBtn';
import React from 'react';
import styled from 'styled-components';

import phoneIcon from 'Assets/icons/btn-phone-black.svg';
import homeIcon from 'Assets/icons/icn-feature-house.svg';
import removeIcon from 'Assets/icons/delete.svg';
import btnEdit from 'Assets/icons/btn-edit.svg';

import Container from '../Container';

const Contact = ({
  phone,
  secondPhone,
  isCityEdited,
  isPhoneEdited,
  onChange,
  city,
  streetAddress,
  onAddSecondPhone,
  addSecondPhone,
  onRemoveSecondPhone,
  initialSecondPhone,
  isSecondPhoneValid,
  onSecondPhoneFocusOut,
  addressInput,
  phoneInput,
  onPhoneEdit,
  onAddressEdit,
  onInputsBlur,
  isStreetAddressEdited,
}) => {
  return (
    <WithRole>
      {role => (
        <Container>
          <Heading>
            <FormattedMessage id="profile.family.contact" />
          </Heading>

          <PhonesList>
            <Phone>
              <PhoneInnerContainer>
                <Icon src={phoneIcon} />
                <div>
                  <PhoneValue
                    innerRef={phoneInput}
                    disabled={!isPhoneEdited}
                    value={phone}
                    onChange={onChange('phone')}
                    onBlur={onInputsBlur('isPhoneEdited')}
                  />
                  <PhoneDesc>
                    <FormattedMessage id="profile.family.contact.phoneMain" />
                  </PhoneDesc>
                </div>
                <EditButton onClick={onPhoneEdit}>
                  <EditIcon src={btnEdit} />
                </EditButton>
              </PhoneInnerContainer>
            </Phone>
            {role === 'angel' && (
              <Address>
                <AddressInnerContainer>
                  <Icon src={homeIcon} />
                  <div>
                    <Street
                      disabled={!isStreetAddressEdited}
                      value={streetAddress}
                      onBlur={onInputsBlur('isStreetAddressEdited')}
                      onChange={onChange('streetAddress')}
                    />
                    <AddressDesc
                      innerRef={addressInput}
                      disabled={!isCityEdited}
                      value={city}
                      onChange={onChange('city')}
                      onBlur={onInputsBlur('isCityEdited')}
                    />
                  </div>
                  <EditButton onClick={onAddressEdit}>
                    <EditIcon src={btnEdit} />
                  </EditButton>
                </AddressInnerContainer>
              </Address>
            )}

            {initialSecondPhone && (
              <Phone>
                <PhoneInnerContainer>
                  <Icon src={phoneIcon} />
                  <EditPhoneContainer>
                    <PhoneValue
                      onChange={onChange('secondPhone')}
                      value={secondPhone}
                      onBlur={onSecondPhoneFocusOut}
                    />
                    {!isSecondPhoneValid && (
                      <PhoneValidation>
                        <FormattedMessage id="profile.family.contact.phoneValidation" />
                      </PhoneValidation>
                    )}
                    <PhoneDesc>
                      <FormattedMessage id="profile.family.contact.phonePartner" />
                    </PhoneDesc>
                  </EditPhoneContainer>
                </PhoneInnerContainer>
                <RemoveBtn onClick={onRemoveSecondPhone}>
                  <RemoveIcon src={removeIcon} />
                </RemoveBtn>
              </Phone>
            )}
            {addSecondPhone && (
              <Phone>
                <PhoneInnerContainer>
                  <Icon src={phoneIcon} />
                  <EditPhoneContainer>
                    <PhoneValue
                      autoFocus
                      onChange={onChange('secondPhone')}
                      value={secondPhone}
                      onBlur={onSecondPhoneFocusOut}
                    />
                    {!isSecondPhoneValid && (
                      <PhoneValidation>
                        <FormattedMessage id="profile.family.contact.phoneValidation" />
                      </PhoneValidation>
                    )}

                    <PhoneDesc>
                      <FormattedMessage id="profile.family.contact.phonePartner" />
                    </PhoneDesc>
                  </EditPhoneContainer>
                </PhoneInnerContainer>
                <RemoveBtn onClick={onRemoveSecondPhone}>
                  <RemoveIcon src={removeIcon} />
                </RemoveBtn>
              </Phone>
            )}
          </PhonesList>
          {role !== 'angel'
            ? !initialSecondPhone && (
                <AddButton onClick={onAddSecondPhone} padding="0">
                  <FormattedMessage id="profile.family.addPhone" />
                </AddButton>
              )
            : null}
        </Container>
      )}
    </WithRole>
  );
};

const Heading = styled.h2`
  font-size: 1rem;
  margin-bottom: 1.25rem;
`;

const PhonesList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-bottom: 1rem;
`;

const Phone = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  width: 100%;

  &:last-child {
    padding-bottom: 0;
  }
`;
const Address = Phone.extend``;
const PhoneInnerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const AddressInnerContainer = PhoneInnerContainer.extend``;
const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
`;
const RemoveIcon = Icon.extend`
  width: 24px;
  height: 24px;
  margin-right: 0;
`;
const PhoneValue = styled.input`
  color: ${props => props.theme.primaryText};
  font-size: 0.9375rem;
  transition: all 200ms ease-in;
  border: 0;
  font-weight: 400;

  &:disabled {
    background: transparent;
  }

  &:disabled {
    background: transparent;
  }

  &:focus {
    outline: 0;
    border-bottom: 1px solid ${props => props.theme.primaryText};
  }
`;

const Street = PhoneValue.extend`
  font-family: ${props => props.theme.secondaryFont};
`;

const EditPhoneContainer = styled.div`
  position: relative;
`;

const PhoneValidation = styled.div`
  position: absolute;
  color: ${props => props.theme.warning};
  right: 0;
  font-weight: 300;
  font-size: 0.875rem;
  &:after {
    content: '*';
    position: absolute;
    right: -0.5rem;
    top: 0;
  }
`;

const PhoneDesc = styled.div`
  font-weight: 300;
  font-size: 0.875rem;
`;

const AddressDesc = styled.input`
  border: 0;
  font-weight: 300;
  font-size: 0.875rem;
  width: 90%;
  &:disabled {
    background: transparent;
  }

  &:focus {
    outline: 0;
    border-bottom: 1px solid ${props => props.theme.primaryText};
  }
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;

  &:focus {
    outline: 0;
  }
`;

const EditButton = styled.button`
  background: transparent;
  border: 0;
  margin-left: auto;
  padding: 0;

  &:focus {
    outline: 0;
  }
`;

const EditIcon = styled.img``;

export default Contact;
