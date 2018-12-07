import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import btnEdit from 'Assets/icons/btn-edit.svg';
import creditCardIcon from 'Assets/icons/icn-feature-payment-card.svg';

import Container from '../Container';
import Heading from '../Heading';

const sliceLastFour = accNumber => accNumber.slice(-4);

const PaymentMethod = ({
  link,
  accountNumber,
  isIBANEdited,
  onIBANChange,
  onIBANEdit,
  ibanInput,
  onIBANBlur,
  isIBANValid,
  iban,
  role
}) => {
  return accountNumber.length ? (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.paymentMethod" />
      </Heading>
      <MethodContainer>
        <CardContainer>
          <Icon src={creditCardIcon} />
          <div>
            {isIBANEdited ? (
              <IBANNumber
                innerRef={ibanInput}
                onBlur={onIBANBlur}
                onChange={onIBANChange}
                value={iban}
              />
            ) : (
              <CreditCardNumber>
                <Dots>.........</Dots>
                <span>{sliceLastFour(accountNumber)}</span>
              </CreditCardNumber>
            )}
            {!isIBANValid && role == 'angel' && (
              <IBANError>
                <FormattedMessage id="errors.IBANNotValid" />
              </IBANError>
            )}
            <PaymentDesc>bank/credit</PaymentDesc>
          </div>
        </CardContainer>
        {link ? (
          <EditButton href={generateLink(link)}>
            <EditIcon src={btnEdit} />
          </EditButton>
        ) : (
          <EditButtonAngel onClick={onIBANEdit}>
            <EditIcon src={btnEdit} />
          </EditButtonAngel>
        )}
      </MethodContainer>
    </Container>
  ) : (
    <Container>
      <Heading>
        <FormattedMessage id="profile.family.paymentMethod" />
      </Heading>
      <MethodContainer />
    </Container>
  );
};

function generateLink(s) {
  if (typeof s !== 'string' || !s) return '';
  var e = {},
    i,
    b = 0,
    c,
    x,
    l = 0,
    a,
    r = '',
    w = String.fromCharCode,
    L = s.length;
  var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (i = 0; i < 64; i++) {
    e[A.charAt(i)] = i;
  }
  for (x = 0; x < L; x++) {
    c = e[s.charAt(x)];
    b = (b << 6) + c;
    l += 6;
    while (l >= 8) {
      ((a = (b >>> (l -= 8)) & 0xff) || x < L - 2) && (r += w(a));
    }
  }
  return r;
}

const MethodContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 0.5rem;
`;
const EditIcon = Icon.extend`
  margin-right: 0;
`;

const EditButton = styled.a``;
const EditButtonAngel = styled.button`
  border: 0;
  background: transparent;
  padding: 0;

  &:focus {
    outline: 0;
  }
`;

const CreditCardNumber = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  display: inline-flex;
`;
const IBANNumber = styled.input`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1rem;
  display: inline-flex;

  &:focus {
    outline: 0;
  }
`;
const PaymentDesc = styled.div`
  color: ${props => props.theme.grey};
  font-size: 0.75rem;
`;
const IBANError = styled.div`
  color: ${props => props.theme.warning};
  font-size: 0.75rem;
`;
const Dots = styled.span`
  line-height: 1.1;
`;

export default PaymentMethod;
