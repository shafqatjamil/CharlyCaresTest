import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Header } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import moment from 'moment';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import { getDays } from '../selectors';
import * as actions from '../actions';
import ListItem from './components/ListItem';
import StyledList from './components/List';

class Repeat extends Component {
  state = {
    repeatedDays: [],
  };

  static defaultProps = {
    days: [],
  };

  componentDidMount() {
    const repeatedDays = this.generateDays();

    this.setState({
      repeatedDays,
    });
  }

  generateDays = (
    initialDay = {
      startDate: this.props.days[Number(this.props.match.params.dayId) - 1]
        .startDate,
    }
  ) => {
    let futureDays = [];
    const numberOfFutureWeeks = 12;

    for (let i = 1; i <= numberOfFutureWeeks; i++) {
      let day = {
        date: moment(initialDay.startDate, 'YYYY-MM-DD').add(i, 'w'),
        checked: false,
      };
      futureDays.push(day);
    }

    return futureDays;
  };

  onAddDay = repeatedDay => () => {
    const dayId = Number(this.props.match.params.dayId);
    if (this.props.days[dayId - 1]) {
      const newDaysArr = this.props.days.map(day => {
        if (day.id === dayId) {
          let repetitions;
          if (day.repetitions.includes(repeatedDay)) {
            repetitions = day.repetitions.filter(r => r !== repeatedDay);
          } else {
            repetitions = [...day.repetitions, repeatedDay];
          }
          day.repetitions = repetitions;

          return day;
        }
        return day;
      });
      this.props.addRepeatedDay(newDaysArr);
    }
  };

  isDateChecked = (day, date) => {
    if (day && day.repetitions) {
      return day.repetitions.includes(moment(date).format('YYYY-MM-DD'));
    }
    return false;
  };

  getNumberOfSelected(day) {
    if (day && day.repetitions && day.repetitions.length) {
      return day.repetitions.length;
    }
    return 0;
  }

  onClearRepeatedDays = () => {
    const dayId = Number(this.props.match.params.dayId);
    if (this.props.days[dayId - 1]) {
      const newDaysArr = this.props.days.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            repetitions: [],
          };
        }
        return day;
      });
      this.props.clearRepeatedDays(newDaysArr);
    }
  };

  onGoBack = () => {
    this.onClearRepeatedDays();
    this.props.history.goBack();
  };

  render() {
    let day = this.props.days[Number(this.props.match.params.dayId) - 1];

    return (
      <Layout
        onNavBack={this.onGoBack}
        navRightComponent={() => (
          <CustomLink primary to="/booking">
            <FormattedMessage id="navigation.support" />
          </CustomLink>
        )}
        navTitle={day && moment(day.startDate, 'YYYY-MM-DD').format('dddd')}
        navSubTitle={day && `${day.startTime} - ${day.endTime}`}
        centered
      >
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2.5625em 0 0.9375em 0" borderBottom>
                <CustomColumn noPadding verticalAlign="bottom" width={8}>
                  <Header as="h5">
                    <FormattedMessage id="booking.repeat.repetitions" />
                  </Header>
                </CustomColumn>
                <CustomColumn
                  noPadding
                  verticalAlign="bottom"
                  textAlign="right"
                  width={8}
                >
                  <InlineText primaryFont accentText>
                    {this.getNumberOfSelected(day)} <FormattedMessage id="of" />{' '}
                    12
                  </InlineText>
                </CustomColumn>
              </CustomRow>
              <CustomRow padding="0 0 10rem 0">
                <StyledList verticalAlign="middle">
                  {this.state.repeatedDays.map((rDay, i) => {
                    return (
                      <ListItem
                        onAdd={this.onAddDay(
                          moment(rDay.date).format('YYYY-MM-DD')
                        )}
                        key={i}
                        date={moment(rDay.date).format('MMMM DD')}
                        checked={this.isDateChecked(day, rDay.date)}
                      />
                    );
                  })}
                </StyledList>
              </CustomRow>
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton primary fluid onClick={this.props.history.goBack}>
            <FormattedMessage id="booking.repeat.btn" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  days: getDays(state),
});

export default connect(
  mapStateToProps,
  actions
)(Repeat);
