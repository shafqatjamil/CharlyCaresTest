import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { nearestMinutes } from 'Utils';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import moment from 'moment';
import React, { Component } from 'react';

import { onSetCurrentDate } from './actions';
import API from './api';
import Config from '../components/Config';
import RemoveItem from '../components/RemoveItem';

class NotAvailable extends Component {
  constructor(props) {
    super(props);
    this.format = 'YYYY-MM-DDTHH:mm';
    this.recurringTypes = ['never', 'daily', 'weekly', 'monthly'];
    const now = moment();
    let tempStartDate;
    let tempEndDate;
    if (!props.location.state) {
      tempStartDate = nearestMinutes(15, now.clone().add(2, 'hours'));
      tempEndDate = nearestMinutes(15, now.clone().add(4, 'hours'));
    } else {
      tempStartDate = moment(props.location.state.start, this.format);
      tempEndDate = moment(props.location.state.end, 'HH:mm');
    }

    this.state = {
      wholeDay: false,
      tempStartDate: tempStartDate.format(this.format),
      tempEndDate: tempEndDate.format('HH:mm'),
      startDate: tempStartDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: tempEndDate.format('HH:mm'),
      repeatEndDate: null,
      tempRepeatEndDate: tempStartDate.format(this.format),
      existingEvent: props.location.state ? true : false,
      isLoading: false,
      error: null,
      selectedRecurringType: 0,
      recurringTypeLabel: this.recurringTypes[0],
    };
  }

  onValueChange = e => {
    const input = e.target.getAttribute('name');
    if (input === 'selectedRecurringType') {
      return this.setState({
        [input]: e.target.value,
        recurringTypeLabel: this.recurringTypes[Number(e.target.value)],
      });
    }
    this.setState({
      [input]: e.target.value,
    });
  };

  onRepeatDateBlur = e => {
    e.persist();
    this.setState(state => ({
      ...state,
      repeatEndDate: moment(state.tempRepeatEndDate, 'YYYY-MM-DD').format(
        'YYYY-MM-DD HH:mm:ss'
      ),
    }));
  };

  onDateBlur = e => {
    e.persist();
    const input = e.target.getAttribute('id');
    this.setState(state => {
      const startDate = moment(state.tempStartDate, this.format);
      const endDate = moment(state.tempEndDate, 'HH:mm');
      if (input === 'startDate') {
        if (endDate.diff(startDate, 'hours') < 2) {
          return {
            ...state,
            startDate: nearestMinutes(15, startDate.clone()).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
            endDate: nearestMinutes(
              15,
              startDate.clone().add(2, 'hours')
            ).format('HH:mm'),
          };
        } else {
          return {
            ...state,
            startDate: nearestMinutes(15, startDate.clone()).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
            endDate: nearestMinutes(15, endDate).format('HH:mm'),
          };
        }
      } else {
        if (endDate.diff(startDate, 'hours') < 2) {
          return {
            ...state,
            startDate: nearestMinutes(
              15,
              moment(
                `${startDate.format('YYYY-MM-DD')} ${endDate.format('HH:mm')}`
              ).subtract(2, 'h')
            ).format('YYYY-MM-DD HH:mm:ss'),
            endDate: nearestMinutes(15, endDate).format('HH:mm'),
          };
        } else {
          return {
            ...state,
            startDate: nearestMinutes(15, startDate.clone()).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
            endDate: nearestMinutes(15, endDate).format('HH:mm'),
          };
        }
      }
    });
  };

  onEventUpdate = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        let data;
        if (this.state.existingEvent) {
          data = {
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            all_day: this.state.wholeDay,
          };
          const { id } = this.props.location.state;
          API.updateEvent(id, data)
            .then(res => {
              this.setState(
                {
                  isLoading: false,
                },
                this.props.history.goBack
              );
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                error: err,
              });
            });
        } else {
          data = {
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            all_day: this.state.wholeDay,
            recurring_end_date: this.state.repeatEndDate,
            recurring_type: this.state.recurringTypeLabel,
            recurring: this.state.recurringTypeLabel ? true : false,
            current_state: 'unavailable',
          };
          API.createEvent(data)
            .then(res => {
              this.setState(
                {
                  isLoading: false,
                },
                this.props.history.goBack
              );
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                error: err,
              });
            });
        }
      }
    );
  };

  onRemoveEvent = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const { id } = this.props.location.state;
        API.deleteEvent(id)
          .then(res => {
            this.setState(
              {
                isLoading: false,
              },
              this.props.history.goBack
            );
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              error: err,
            });
          });
      }
    );
  };

  onErrorConfirm = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    return (
      <Layout
        navBorder
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="calendar.angel.notAvailable.title" />}
      >
        {this.state.isLoading ? <Loader isLoading /> : null}
        {this.state.error ? (
          <Error
            errors={this.state.error}
            onErrorConfirm={this.onErrorConfirm}
          />
        ) : null}
        <CustomRow noPadding>
          <CustomColumn noPadding>
            <Divider />
            <Grid container>
              <CustomRow padding="2rem 0 0">
                <Config
                  wholeDay={this.state.wholeDay}
                  tempStartDate={this.state.tempStartDate}
                  tempEndDate={this.state.tempEndDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  repeatEndDate={this.state.tempRepeatEndDate}
                  selectedRepeatEndDate={this.state.repeatEndDate}
                  onValueChange={this.onValueChange}
                  onDateBlur={this.onDateBlur}
                  onSelectRepeat={this.onSelectRepeat}
                  onRepeatDateBlur={this.onRepeatDateBlur}
                  existingEvent={this.state.existingEvent}
                  selectedRecurringType={this.state.selectedRecurringType}
                  recurringTypes={this.recurringTypes}
                />
              </CustomRow>
              {this.state.existingEvent ? (
                <CustomRow noPadding>
                  <RemoveItem onClick={this.onRemoveEvent} topBorder />
                </CustomRow>
              ) : null}
            </Grid>
          </CustomColumn>
        </CustomRow>
        <Confirmation>
          <BasicButton primary fluid onClick={this.onEventUpdate}>
            <FormattedMessage id="save" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

export default connect(
  null,
  { onSetCurrentDate }
)(NotAvailable);
