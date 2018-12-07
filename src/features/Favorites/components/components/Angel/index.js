import { isMobile } from 'react-device-detect';
import { Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import DefaultAngelImage from 'Components/DefaultAngelImage';

import chatIcon from 'Assets/icons/btn-chat.svg';
import phoneIcon from 'Assets/icons/btn-phone.svg';
import phoneIconDisabled from 'Assets/icons/btn-phone-disabled.svg';
import chatIconDisabled from 'Assets/icons/btn-chat-disabled.svg';
import btnCalendar from 'Assets/icons/btn-calendar.svg';
import btnCalendarDisabled from 'Assets/icons/btn-calendar-disabled.svg';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';

const SectionWrapper = styled.li`
  display: flex;
  padding: 0.90625rem 1rem;
  width: 100%;
  position: relative;
  background-color: #fff;

  ${props =>
    !isMobile
      ? `
  border-radius: 0.3125rem;
  border: 1px solid ${props.theme.defaultGrey};
  margin-bottom: 0.3125rem;`
      : null} &:last-child::after {
    display: none;
  }

  ${props =>
    isMobile
      ? `
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.3125rem;
    background-color: ${props.theme.defaultGrey};
    background: #f9f8f9;
    border-top: 1px solid ${props.theme.defaultGrey};
    border-bottom: 1px solid ${props.theme.defaultGrey};
  }`
      : null};
`;

const SectionWrapperAsDiv = SectionWrapper.extend`
  padding: 0;
`.withComponent('div');

const CustomImage = DefaultAngelImage.extend`
  width: 81px;
  height: 81px;
  margin-right: 2.2%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  max-height: 3.125rem;
  cursor: pointer;
  background: transparent;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

const CallButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 3rem;
  margin-right: 1.5rem;
`;

const ButtonText = styled.div`
  color: ${props => (props.enabled ? props.theme.accentText : '#C7C7C9')};
  font-size: 0.75rem;
`;

const AngelName = styled.h5`
  margin-top: 0.55rem !important;
  margin-bottom: 0;
`;

const ArrowBtn = styled.button`
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
  width: 5.25rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

const onNavigate = (history, to, state) => () => {
  history.push(to, state);
};

const AngelSection = ({
  phone,
  bookingEnabled,
  history,
  name,
  age,
  img,
  div,
  id,
  onAngelSelect,
  userId,
}) => {
  const angelData = { img, name, phone };
  return div ? (
    <SectionWrapperAsDiv>
      <CustomImage src={img} onClick={onAngelSelect} />
      <div>
        <AngelName>
          {name} ({age})
        </AngelName>
        <Buttons>
          <Button
            onClick={
              userId && onNavigate(history, `/chat/${userId}`, angelData)
            }
          >
            <Image src={id ? chatIcon : chatIconDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="booking.accepted.message" />
            </ButtonText>
          </Button>

          <CallButton href={phone && `tel:${phone}`}>
            <Image src={phone ? phoneIcon : phoneIconDisabled} />
            <ButtonText enabled={phone ? true : false}>
              <FormattedMessage id="booking.accepted.call" />
            </ButtonText>
          </CallButton>
          <Button
            onClick={id && onNavigate(history, `/calendar/bookings/${id}`)}
          >
            <Image src={id ? btnCalendar : btnCalendarDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="booking.accepted.booking" />
            </ButtonText>
          </Button>
        </Buttons>
      </div>
      <ArrowBtn onClick={onAngelSelect}>
        <Image src={arrowRight} />
      </ArrowBtn>
    </SectionWrapperAsDiv>
  ) : (
    <SectionWrapper>
      <CustomImage src={img} onClick={onAngelSelect} />
      <div>
        <AngelName>
          {name} ({age})
        </AngelName>
        <Buttons>
          <Button
            onClick={
              isMobile
                ? userId && onNavigate(history, `/chat/${userId}`, angelData)
                : userId &&
                  onNavigate(history, `/favorites/chat/${userId}`, angelData)
            }
          >
            <Image src={id ? chatIcon : chatIconDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="booking.accepted.message" />
            </ButtonText>
          </Button>

          <CallButton href={phone && `tel:${phone}`}>
            <Image src={phone ? phoneIcon : phoneIconDisabled} />
            <ButtonText enabled={phone ? true : false}>
              <FormattedMessage id="booking.accepted.call" />
            </ButtonText>
          </CallButton>

          <Button
            onClick={id && onNavigate(history, `/calendar/bookings/${id}`)}
          >
            <Image src={id ? btnCalendar : btnCalendarDisabled} />
            <ButtonText enabled={id}>
              <FormattedMessage id="booking.accepted.booking" />
            </ButtonText>
          </Button>
        </Buttons>
      </div>
      <ArrowBtn onClick={onAngelSelect}>
        <Image src={arrowRight} />
      </ArrowBtn>
    </SectionWrapper>
  );
};

export default AngelSection;
