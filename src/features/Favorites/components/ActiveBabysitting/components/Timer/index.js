import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import infoIcon from 'Assets/icons/btn-info.svg';

import AnimatedCircle from 'Components/AnimatedCircle';

class Timer extends React.PureComponent {
  state = {
    stopped: false,
    hours: 0,
    minutes: 0,
  };
  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onTimerStop = () => {
    clearInterval(this.timer);
    this.setState(
      {
        stopped: true,
      },
      () => {
        const { startTime, transactionCosts, credit, bookingId } = this.props;
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS');

        this.props.history.push('/payments/confirmation', {
          startTime: startTime.date,
          endTime: currentTime,
          angel: this.props.angel,
          transactionCosts,
          credit,
          bookingId,
        });
      }
    );
  };

  setTimer = () => {
    if (this.props.startTime) {
      this.timer = setInterval(() => {
        const currentTime = moment();
        const startTime = moment(
          this.props.startTime.date,
          'YYYY-MM-DD HH:mm:ss.SSSSSS'
        );

        const hours = currentTime.diff(startTime, 'hours');
        const minutes = currentTime
          .subtract(hours, 'hours')
          .diff(startTime, 'minutes');

        this.setState({
          hours,
          minutes,
        });
      }, 1000);
    }
  };

  render() {
    return this.props.startTime ? (
      <Container>
        <div>
          <TimerHeading>
            <FormattedMessage id="favorites.timer.heading" />
          </TimerHeading>
          <RemainingTime>
            <FormattedMessage
              id="time"
              values={{
                hours: this.state.hours,
                minutes: this.state.minutes,
              }}
            />
          </RemainingTime>
          <Info>
            <Image avatar src={infoIcon} />
            Hoe werkt dit?
          </Info>
        </div>
        <div onClick={this.onTimerStop}>
          <AnimatedCircle
            stopped={this.state.stopped}
            dashArray={this.state.totalLength}
            dashOffset={this.state.circumference}
          />
        </div>
      </Container>
    ) : null;
  }
}

const Container = styled.div`
  background-color: #e6e6e6;
  border-radius: 6px;
  width: 100%;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
`;

const TimerHeading = styled.div`
  color: ${props => props.theme.lightGrey};
  font-size: 0.75rem;
`;

const RemainingTime = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 300;
  font-size: 1.125rem;
`;

const Info = styled.div`
  color: ${props => props.theme.secondaryColor};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
`;

export default Timer;
