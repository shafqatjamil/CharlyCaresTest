import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import chatIcon from 'Assets/icons/btn-chat.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';
import chatIconDisabled from 'Assets/icons/btn-chat-disabled.svg';
import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';

const SectionWrapper = styled.div`
  display: flex;
  padding: 0.90625rem 0;
  width: 100%;
  position: relative;
`;

const CustomImage = styled.img`
  width: 81px;
  height: 81px;
  opacity: ${props => (props.declined ? 0.4 : 1)};
  border-radius: 50%;
  margin-right: 3.2vw;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const CallButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
`;

const ButtonText = styled.div`
  color: ${props => (props.enabled ? props.theme.accentText : '#C7C7C9')};
  font-size: 0.75rem;
`;

const AngelName = styled.h5`
  margin-bottom: 0.5rem;
  padding-top: 0.4125rem;
`;

const ArrowBtn = styled.button`
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: 0;
  padding: 0;
  width: 20%;
  height: 100%;
  text-align: right;
  cursor: pointer;
`;

const ArrowImg = styled.img``;

const onNavigate = (history, to, state) => () => {
  history.push(to, state);
};

const AngelSection = ({
  angelId,
  phone,
  history,
  name,
  age,
  img,
  declined,
}) => {
  const angelData = {
    img,
    name,
    phone,
  };
  return (
    <SectionWrapper>
      <CustomImage declined={declined} src={img} />
      <div>
        <AngelName>
          {name} ({age})
        </AngelName>
        <Buttons>
          <Button
            onClick={
              isMobile
                ? angelId && onNavigate(history, '/chat/' + angelId, angelData)
                : angelId &&
                  onNavigate(history, '/booking/chat/' + angelId, angelData)
            }
          >
            <Image src={angelId ? chatIcon : chatIconDisabled} />
            <ButtonText enabled={angelId}>message</ButtonText>
          </Button>
          <CallButton href={`tel:+${phone}`}>
            <Image src={phone ? phoneIcon : phoneIconDisabled} />
            <ButtonText enabled>call</ButtonText>
          </CallButton>
          <Button
            onClick={
              angelId &&
              onNavigate(history, '/calendar/availability/' + angelId)
            }
          >
            <Image src={angelId ? btnCalendar : btnCalendarDisabled} />
            <ButtonText enabled={angelId}>booking</ButtonText>
          </Button>
        </Buttons>
      </div>
      <ArrowBtn
        onClick={
          isMobile
            ? onNavigate(history, '/angel/' + angelId, {
                from: 'bookingDetails',
              })
            : onNavigate(history, '/booking/angel/' + angelId, {
                from: 'bookingDetails',
              })
        }
      >
        <ArrowImg src={arrowRight} />
      </ArrowBtn>
    </SectionWrapper>
  );
};

export default AngelSection;
