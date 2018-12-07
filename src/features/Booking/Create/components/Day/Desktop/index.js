import { FormattedMessage } from 'react-intl';
import { InlineText } from 'Components/Text';
import styled from 'styled-components';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import DateTime from 'react-datetime';
import Divider from 'Components/Divider';
import moment from 'moment';
import React from 'react';

import rightArrow from 'Assets/icons/btn-large-arrow-right.svg';

import CardGrid from '../../CardGrid';
import DateTimeWrapper from '../components/DateTimeWrapper';
import DayIndex from '../components/DayIndex';
import DesktopInput from 'Components/DesktopInput';
import DesktopTime from 'Components/DesktopTime';
import CustomImage from '../components/Image';
import RepeatContainer from '../components/RepeatContainer';
import RepeatValue from '../components/RepeatValue';

import deleteIcon from 'Assets/icons/btn-cancel.svg';

const StyledImage = styled.img`
  &&& {
    display: block;
    height: 40px;
    position: relative;
    float: right;
    top: 15px;
  }
`;

const DeleteButton = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

class Day extends React.Component {
  render() {
    const {
      initialDate,
      dayIndex,
      initialStartTime,
      onValueChange,
      repetitions,
      startDate,
      startTime,
      endTime,
      index,
      onDeleteDay,
    } = this.props;
    return (
      <React.Fragment>
        <CustomColumn noPadding width={16}>
          <Divider>
            <FormattedMessage id="booking.create.day" />
            <DayIndex>{dayIndex}</DayIndex>
            {index + 1 > 1 && (
              <DeleteButton onClick={onDeleteDay(dayIndex)}>
                <StyledImage src={deleteIcon} />
              </DeleteButton>
            )}
          </Divider>
          <CardGrid>
            <CustomRow padding="1.667rem 0 0.8335rem 0">
              <CustomColumn padding="0" verticalAlign="middle" width={4}>
                <InlineText primaryFont>
                  <FormattedMessage id="booking.create.day.start" />
                </InlineText>
              </CustomColumn>
              <CustomColumn
                verticalAlign="middle"
                padding="0"
                textAlign="right"
                width={8}
              >
                <DateTimeWrapper>
                  {startDate ? (
                    <DateTime
                      dateFormat="dd. DD MMMM"
                      timeFormat={false}
                      closeOnSelect
                      onChange={onValueChange('startDate')}
                      renderInput={props => <DesktopInput {...props} />}
                      className="rdt-relative"
                      value={moment(startDate, 'YYYY-MM-DD')}
                      inputProps={{
                        name: 'startDate',
                        min: `${initialDate}T${initialStartTime}`,
                      }}
                    />
                  ) : null}
                </DateTimeWrapper>
              </CustomColumn>
              <CustomColumn
                padding="0"
                verticalAlign="middle"
                textAlign="right"
                width={4}
              >
                <DesktopTime
                  date={startDate}
                  startTime={startTime}
                  value={startTime}
                  type="start"
                  name="startTime"
                  onChange={onValueChange('startTime')}
                />
              </CustomColumn>
            </CustomRow>
            <CustomRow padding="0.8335rem 0">
              <CustomColumn padding="0" verticalAlign="middle" width={12}>
                <InlineText primaryFont>
                  <FormattedMessage id="booking.create.day.end" />
                </InlineText>
              </CustomColumn>
              <CustomColumn
                padding="0"
                verticalAlign="middle"
                textAlign="right"
                width={4}
              >
                <DesktopTime
                  date={startDate}
                  type="end"
                  startTime={startTime}
                  value={endTime}
                  name="endTime"
                  onChange={onValueChange('endTime')}
                />
              </CustomColumn>
            </CustomRow>
            <CustomRow padding="0.8335rem 0">
              <CustomColumn padding="0" verticalAlign="middle" width={11}>
                <InlineText primaryFont>
                  <FormattedMessage id="booking.create.day.repeat" />
                </InlineText>
              </CustomColumn>
              <CustomColumn
                padding="0"
                verticalAlign="middle"
                textAlign="right"
                width={5}
              >
                <RepeatContainer>
                  <RepeatValue>
                    <CustomLink primary to={`/booking/repeat/${dayIndex}`}>
                      {repetitions &&
                      repetitions.length &&
                      repetitions.length > 0 ? (
                        `${repetitions.length} x`
                      ) : (
                        <FormattedMessage id="booking.repeat.never" />
                      )}
                    </CustomLink>
                  </RepeatValue>
                  <CustomImage src={rightArrow} />
                </RepeatContainer>
              </CustomColumn>
            </CustomRow>
          </CardGrid>
        </CustomColumn>
      </React.Fragment>
    );
  }
}

export default Day;
