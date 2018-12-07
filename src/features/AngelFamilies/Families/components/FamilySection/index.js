import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import FamilyContact from '../FamilyContact';

class FamilySection extends React.PureComponent {
  static defaultProps = {
    activeSitting: {},
  };

  state = {
    hours: null,
    minutes: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.activeSitting && !prevState.minutes && !prevState.hours) {
      this.renderTime();
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  calculateRemainingTime = (start, end) => {
    if (!start || !end)
      return {
        hours: null,
        minutes: null,
      };
    const currentTime = moment();
    const endTime = moment(end.date, 'YYYY-MM-DD HH:mm:ss.SSSSSS');

    const hours = endTime.diff(currentTime, 'hours');
    const minutes = endTime
      .subtract(hours, 'hours')
      .diff(currentTime, 'minutes');

    return {
      hours,
      minutes,
    };
  };

  renderTime = () => {
    const { hours, minutes } = this.calculateRemainingTime(
      this.props.activeSitting && this.props.activeSitting.start_time,
      this.props.activeSitting && this.props.activeSitting.end_time
    );
    if (hours && hours <= 0 && (minutes && minutes <= 0)) {
      return this.setState({
        hours: 0,
        minutes: 0,
      });
    } else {
      this.timer = setInterval(() => {
        const { hours, minutes } = this.calculateRemainingTime(
          this.props.activeSitting && this.props.activeSitting.start_time,
          this.props.activeSitting && this.props.activeSitting.end_time
        );
        this.setState(prevState => {
          return {
            hours,
            minutes,
          };
        });
      }, 60000);
    }
  };

  render() {
    if (
      (this.props.activeSitting && this.props.activeSitting.length) ||
      !this.props.activeSitting
    ) {
      return null;
    }
    return (
      <React.Fragment>
        {!this.props.activeSitting || this.props.activeSitting.length ? null : (
          <Divider />
        )}
        <Grid container>
          <CustomRow>
            <Container>
              {this.props.activeSitting &&
              typeof this.props.activeSitting === 'object' &&
              !this.props.activeSitting instanceof Array ? (
                <FamilyContact
                  name={`Fam. ${this.props.activeSitting.family[0].last_name}`}
                  img={this.props.activeSitting.family[0].image}
                  id={this.props.activeSitting.family[0].user_id}
                  familyId={this.props.activeSitting.family[0].family_id}
                />
              ) : null}

              <TimeContainer>
                <TimeHeading>Tijd bezig met oppassen</TimeHeading>
                <Time>
                  <FormattedMessage id="time" values={this.state} />
                </Time>
              </TimeContainer>
            </Container>
          </CustomRow>
        </Grid>
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
  width: 100%;
`;

const TimeContainer = styled.div`
  width: 100%;
  background-color: #e6e6e6;
  border-radius: 6px;
  padding: 0.5rem 0.75rem 1rem;
`;
const TimeHeading = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.lightGrey};
`;
const Time = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-size: 1.125rem;
  font-weight: 300;
`;

export default FamilySection;
