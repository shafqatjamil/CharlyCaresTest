import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import anime from 'animejs';

import calendar from 'Assets/icons/btn-calendar-small.svg';
import calendarIcon from 'Assets/icons/btn-tabbar-large-calendar.svg';
import notAvailable from 'Assets/icons/icon-tabbar-not-available.svg';
import weekView from 'Assets/icons/icon-tabbar-view.svg';

import ActionIcon from './components/ActionIcon';
import Btn from './components/Btn';
import BtnText from './components/BtnText';
import Container from './components/Container';
import IconContainer from './components/IconContainer';
import Menu from './components/Menu';

export default class CalendarNav extends PureComponent {
  state = {
    currentRoute: '',
  };

  scrollToToday() {
    const todayEl = document.querySelector('#today');
    let position;

    if (todayEl) {
      position = todayEl.getBoundingClientRect();
    } else {
      return;
    }

    anime({
      targets: 'html, body',
      duration: 350,
      easing: 'easeInOutCubic',
      scrollTop: [position.y],
    });
  }

  render() {
    return (
      <Menu {...this.props} borderless fixed="bottom">
        <Container horizontal>
          <Btn onClick={this.scrollToToday}>
            <IconContainer>
              <Image src={calendar} />
            </IconContainer>
            <BtnText isSelected>Today</BtnText>
          </Btn>
          <Btn
            as={Link}
            to={
              window.location.pathname === '/calendar/week'
                ? '/calendar'
                : '/calendar/week'
            }
          >
            <IconContainer>
              <Image src={weekView} />
            </IconContainer>
            <BtnText isSelected>
              {window.location.pathname === '/calendar/week'
                ? 'Month view'
                : 'Week view'}
            </BtnText>
          </Btn>
          <Btn as={Link} to="/calendar/unavailable">
            <IconContainer>
              <Image src={notAvailable} />
            </IconContainer>
            <BtnText isSelected>Not available</BtnText>
          </Btn>
          <Btn as={Link} to="/calendar/add">
            <IconContainer>
              <ActionIcon>
                <Image src={calendarIcon} />
              </ActionIcon>
            </IconContainer>
            <BtnText isSelected>Add calendar</BtnText>
          </Btn>
        </Container>
      </Menu>
    );
  }
}
