import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import sendIcon from 'Assets/icons/chat-send.svg';

function onEnterSubmit(newMessage, onMessageSend) {
  return function(e) {
    if (e.key === 'Enter' && newMessage.length > 0) {
      onMessageSend();
    }
  };
}

const SendMessageSection = ({
  newMessage,
  onNewMessageChange,
  onMessageSend,
  intl,
  navigateToBooking,
}) => {
  return (
    <Container>
      <Input
        value={newMessage}
        onChange={onNewMessageChange}
        placeholder={intl.formatMessage({
          id: 'chat.message',
        })}
        onKeyDown={onEnterSubmit(newMessage, onMessageSend)}
      />
      {newMessage.length !== 0 ? (
        <SendButtonContainer onClick={onMessageSend}>
          <SendIcon src={sendIcon} />
        </SendButtonContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  z-index: 999999;
  
`;

const Input = styled.input`
  border: 1px solid #000;
  border-radius: 30px;
  background-color: #fff;
  width: 90%;
  display: block;
  padding: 0.46875rem 1.25rem;
  min-height: 2.3125rem;
  &:focus {
    outline: 0;
  }

  ::placeholder {
    color: ${props => props.theme.grey};
    font-size: 0.9375rem;
    font-family: ${props => props.theme.secondaryFont};
  }
`;

const SendButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.secondaryColor};
  height: 2.3125rem;
  margin-left: 1rem;
  margin-right: 1rem;
  background: transparent;
  border: 0;
  width: 5%;

  &:focus {
    outline: 0;
  }
`;

const SendIcon = styled.img`
  width: 2.1rem;
`;

export default injectIntl(SendMessageSection);
