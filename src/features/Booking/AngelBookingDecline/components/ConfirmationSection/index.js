import React from 'react';
import styled from 'styled-components';
import BasicButton from 'Components/Buttons/Basic';

const ConfirmationSection = ({ onCancel, onConfirm }) => {
  return (
    <Container>
      <CancelButtonWrapper>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </CancelButtonWrapper>

      <SendAndDeclineButtonWrapper>
        <BasicButton onClick={onConfirm} fluid primary>
          Send and decline
        </BasicButton>
      </SendAndDeclineButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CancelButton = styled.button`
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  padding: 0.5rem 0.2rem 0.2rem;
`;
const CancelButtonWrapper = styled.div`
  flex: 1;
`;

const SendAndDeclineButtonWrapper = styled.div`
  flex: 1.5;
`;

export default ConfirmationSection;
