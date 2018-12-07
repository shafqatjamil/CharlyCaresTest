import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { nearestMinutes } from 'Utils';
import BasicButton from 'Components/Buttons/Basic';
import moment from 'moment';
import Navigation from 'Components/Navigation';
import DesktopError from 'Components/DesktopError';
import Loader from 'Components/Loader';
import React, { Component, Fragment } from 'react';

import API from '../api';
import Config from './components/Config';
import RemoveItem from '../../components/RemoveItem';

export default class FixedSitting extends Component {
  constructor(props) {
    super(props);
    this.format = 'dd. DD MMMM';
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
      startDate: tempStartDate.clone().format(this.format),
      endDate: tempEndDate.clone().format(this.format),
      startTime: tempStartDate.clone().format('HH:mm'),
      endTime: tempEndDate.clone().format('HH:mm'),
      repeatEndDate: null,
      tempRepeatEndDate: tempStartDate.format(this.format),
      existingEvent: props.location.state ? true : false,
      isLoading: false,
      error: null,
      selectedRecurringType: this.recurringTypes[0],
    };
  }
  onValueChange = input => mDate => {
    this.setState(state => {
      if (
        input === 'startDate' &&
        moment(state.endDate, this.format).isBefore(mDate)
      ) {
        return {
          ...state,
          [input]: mDate.format(this.format),
          endDate: mDate.format(this.format),
        };
      }
      if (
        input === 'endDate' &&
        moment(state.startDate, this.format).isAfter(mDate)
      ) {
        return {
          ...state,
          [input]: mDate.format(this.format),
          startDate: mDate.format(this.format),
        };
      }
      return {
        ...state,
        [input]: mDate.format(this.format),
      };
    });
  };
  onSelectChange = (e, data) => {
    const input = e.target.getAttribute('name');
    if (input === 'wholeDay') {
      return this.setState({
        [input]: e.target.value,
      });
    }
    this.setState({
      [data.name]: data.value,
    });
  };

  onTimeChange = (_, { name, value }) => {
    this.setState(state => {
      if (
        name === 'startTime' &&
        moment(state.endTime, 'HH:mm').diff(moment(value, 'HH:mm'), 'hours') < 2
      ) {
        return {
          [name]: value,
          endTime: moment(value, 'HH:mm')
            .add(2, 'hours')
            .format('HH:mm'),
        };
      }
      if (
        name === 'endTime' &&
        moment(state.endTime, 'HH:mm').diff(moment(value, 'HH:mm'), 'hours') < 2
      ) {
        return {
          [name]: value,
          startTime: moment(value, 'HH:mm')
            .subtract('hours', 2)
            .format('HH:mm'),
        };
      }
      return {
        [name]: value,
      };
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

  onEventUpdate = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        let data;
        if (this.state.existingEvent) {
          data = {
            start_date: moment(
              `${this.state.startDate} ${this.state.startTime}`,
              'dd. DD MMMM HH:mm'
            ).format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(
              `${this.state.endDate} ${this.state.endTime}`,
              'dd. DD MMMM HH:mm'
            ).format('YYYY-MM-DD HH:mm:ss'),
            all_day: this.state.wholeDay,
          };
          const { id } = this.props.location.state;
          API.updateEvent(id, data)
            .then(res => {
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  this.props.history.push('/calendar');
                }
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
            start_date: moment(
              `${this.state.startDate} ${this.state.startTime}`,
              'dd. DD MMMM HH:mm'
            ).format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(
              `${this.state.endDate} ${this.state.endTime}`,
              'dd. DD MMMM HH:mm'
            ).format('YYYY-MM-DD HH:mm:ss'),
            all_day: this.state.wholeDay,
            recurring_end_date: moment(
              this.state.repeatEndDate,
              this.format
            ).format('YYYY-MM-DD HH:mm:ss'),
            recurring:
              this.state.selectedRecurringType !== 'never' ? true : false,
            current_state: 'available',
          };
          if (this.state.selectedRecurringType !== 'never') {
            data = Object.assign(data, {
              recurring_type: this.state.selectedRecurringType,
            });
          }
          API.createEvent(data)
            .then(res => {
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  this.props.history.push('/calendar');
                }
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
              () => {
                this.props.history.push('/calendar');
              }
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
      <Fragment>
        <Navigation
          title={<FormattedMessage id="calendar.angel.fixedSitting.title" />}
          onBack={this.props.history.goBack}
        />
        <DesktopError
          errors={this.state.errors}
          onErrorConfirm={this.onErrorConfirm}
        />
        {this.state.isLoading ? <Loader isLoading /> : null}
        <Segment basic vertical>
          <Segment basic vertical>
            <Config
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              onValueChange={this.onValueChange}
              onSelectChange={this.onSelectChange}
              onTimeChange={this.onTimeChange}
              recurringTypes={this.recurringTypes}
              selectedRecurringType={this.state.selectedRecurringType}
            />
          </Segment>
          {/* <Segment basic vertical>
            <Sitting selected={['option1', 'option3']} />
          </Segment>
          <SittingTypes /> */}
          {this.state.existingEvent ? (
            <RemoveItem onClick={this.onRemoveEvent} topBorder />
          ) : null}

          <BasicButton primary fluid onClick={this.onEventUpdate}>
            <FormattedMessage id="save" />
          </BasicButton>
        </Segment>
      </Fragment>
    );
  }
}
