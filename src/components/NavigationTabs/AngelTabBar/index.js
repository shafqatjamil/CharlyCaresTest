import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import React, { PureComponent } from 'react';

import calendarIcon from 'Assets/icons/btn-tabbar-large-calendar.svg';

import ActionIcon from '../components/ActionIcon';
import Btn from '../components/Btn';
import BtnText from '../components/BtnText';
import Container from '../components/Container';
import defaultTheme from '../../../themes/default';
import IconContainer from '../components/IconContainer';
import Menu from '../components/Menu';

export default class AngelTabBar extends PureComponent {
  state = {
    currentRoute: '',
  };

  componentDidMount() {
    this.setState({
      currentRoute: this.checkCurrentRoute(),
    });
  }

  checkCurrentRoute = () => {
    const currentRoute = window.location.pathname;
    if (currentRoute.includes('booking')) {
      return 'booking';
    }
    if (currentRoute.includes('families')) {
      return 'families';
    }
    if (currentRoute.includes('payments')) {
      return 'payments';
    }
    if (currentRoute.includes('profile')) {
      return 'profile';
    }
  };

  render() {
    return (
      <Menu {...this.props} borderless fixed="bottom">
        <Container horizontal>
          <Btn as={Link} to="/booking">
            <IconContainer>
              <svg
                preserveAspectRatio="none"
                width="31"
                height="27"
                viewBox="0 0 31 27"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke={
                    this.state.currentRoute === 'booking'
                      ? defaultTheme.secondaryColor
                      : '#A9A9AC'
                  }
                  strokeWidth="1.3"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15.5 13.655c-.087 0-4.833-3.1-4.833-6.11 0-1.677.965-2.678 2.578-2.678.944 0 2.255.741 2.255 2.26.141-1.519 1.31-2.26 2.254-2.26 1.613 0 2.544 1.001 2.579 2.677.062 2.984-4.747 6.11-4.833 6.11zM1 18.055h9.367v1.45a1.8 1.8 0 0 0 1.8 1.8h6.964a1.8 1.8 0 0 0 1.8-1.8v-1.45h8.793v8.078H1v-8.078zM1 18.055l4.032-8.079h2.251M29.724 18.055l-4.032-8.079H23.44" />
                  <path d="M7.283 15.017V1.483h16.153v13.534" />
                </g>
              </svg>
            </IconContainer>
            <BtnText isSelected={this.state.currentRoute === 'booking' && true}>
              Bookings
            </BtnText>
          </Btn>

          <Btn as={Link} to="/families">
            <IconContainer>
              <svg
                width="31"
                height="28"
                viewBox="0 0 31 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <g
                    strokeWidth="1.3"
                    stroke={
                      this.state.currentRoute === 'families'
                        ? defaultTheme.secondaryColor
                        : '#A9A9AC'
                    }
                  >
                    <path d="M8.5 10c1.754 0 3.5-1.701 3.5-4.5 0-2.485-.72-4.255-3.5-4.255C5.72 1.245 5 3.015 5 5.5 5 8.34 6.746 10 8.5 10z" />
                    <path
                      d="M22.191 12c1.574 0 2.85-1.477 2.85-4.323-1.538-.235-2.684-1.294-3.436-3.177-.507 1.513-1.261 2.572-2.264 3.177 0 2.82 1.276 4.323 2.85 4.323zM1.043 25v-9.65c0-1.654 1.023-2.398 2.52-2.89 1-.329 1.859-.487 2.579-.475l2.213 6.486M4.5 18v5.5M26.5 18v5.5M10 14.666l.625-2.626c1.68 0 2.864.13 3.55.392.685.261 1.39.82 2.117 1.677M19.635 13.401C19.97 15.134 20.805 16 22.137 16c1.333 0 2.167-.868 2.503-2.605 1.386-.024 2.518.288 3.395.937.877.649 1.426 1.552 1.647 2.71V25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.02 10.652c-.255-3.173-.045-5.446.63-6.82.58-1.184 1.756-2.002 3.527-2.457a4 4 0 0 1 1.847-.034c1.805.394 3.001 1.224 3.59 2.49.685 1.475.93 3.748.738 6.82"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M15 16.65a2.35 2.35 0 0 0-2.35 2.317c-.006.46.018.918.071 1.374l.006.048a2.8 2.8 0 0 0 2.78 2.461 2.815 2.815 0 0 0 2.792-2.463l.006-.046c.05-.422.058-.915.025-1.478a2.35 2.35 0 0 0-2.346-2.213H15z" />
                    <path
                      d="M10 27v-.224a2 2 0 0 1 1.516-1.94l1.17-.292a1 1 0 0 1 .808.145l2.006 1.376 2.066-1.382a1 1 0 0 1 .803-.138l1.124.286A2 2 0 0 1 21 26.769V27"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              </svg>
            </IconContainer>
            <BtnText
              isSelected={this.state.currentRoute === 'families' && true}
            >
              Families
            </BtnText>
          </Btn>
          <Btn as={Link} to="/calendar">
            <IconContainer>
              <ActionIcon>
                <Image src={calendarIcon} />
              </ActionIcon>
            </IconContainer>
            <BtnText>Calendar</BtnText>
          </Btn>
          <Btn as={Link} to="/payments">
            <IconContainer>
              <svg
                preserveAspectRatio="none"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(1 1)" fill="none" fillRule="evenodd">
                  <rect
                    stroke={
                      this.state.currentRoute === 'payments'
                        ? defaultTheme.secondaryColor
                        : '#A9A9AC'
                    }
                    strokeWidth="1.3"
                    x=".5"
                    width="26"
                    height="26"
                    rx="13"
                  />
                  <path
                    d="M14.16 7.487c-1.935 0-3.142 1.222-3.621 3.666h4.64v1.174h-4.767l-.019.519v.582l.019.41h4.212v1.173h-4.067c.225 1.092.645 1.937 1.26 2.534.616.598 1.44.897 2.47.897.947 0 1.884-.2 2.812-.6v1.364a7.01 7.01 0 0 1-2.884.591c-1.438 0-2.595-.408-3.471-1.223-.877-.816-1.455-2.004-1.734-3.563H7.5v-1.173h1.383l-.018-.383v-.4l.018-.728H7.5v-1.174h1.492c.237-1.583.798-2.817 1.684-3.703.885-.886 2.047-1.328 3.484-1.328 1.22 0 2.33.294 3.33.882l-.645 1.265c-1.007-.522-1.902-.782-2.685-.782z"
                    fill={
                      this.state.currentRoute === 'payments'
                        ? defaultTheme.secondaryColor
                        : '#A9A9AC'
                    }
                  />
                </g>
              </svg>
            </IconContainer>
            <BtnText
              isSelected={this.state.currentRoute === 'payments' && true}
            >
              Payments
            </BtnText>
          </Btn>
          <Btn as={Link} to="/profile">
            <IconContainer>
              <svg
                preserveAspectRatio="none"
                width="26"
                height="27"
                viewBox="0 0 26 27"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform="translate(0 1)"
                  stroke={
                    this.state.currentRoute === 'profile'
                      ? defaultTheme.secondaryColor
                      : '#A9A9AC'
                  }
                  strokeWidth="1.3"
                  fill="none"
                  fillRule="evenodd"
                >
                  <ellipse
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    cx="12.156"
                    cy="7.8"
                    rx="6.838"
                    ry="7.8"
                  />
                  <path d="M15.178 15.189H9.29l.078 2.97-6.491 2.308A3.35 3.35 0 0 0 .65 23.623v1.727h23.771v-1.671c0-1.44-.92-2.72-2.286-3.177l-6.957-2.33V15.19z" />
                  <path
                    d="M5.8 6.15c3.163 1.169 5.734.507 7.714-1.984.836 2.498 2.665 3.16 5.488 1.984"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </IconContainer>
            <BtnText isSelected={this.state.currentRoute === 'profile'}>
              Profile
            </BtnText>
          </Btn>
        </Container>
      </Menu>
    );
  }
}
