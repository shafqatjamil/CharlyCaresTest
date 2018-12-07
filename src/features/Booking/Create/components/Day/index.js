import { FormattedMessage } from 'react-intl';
import { InlineText } from 'Components/Text';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import CustomLink from 'Components/CustomLink';
import Divider from 'Components/Divider';
import moment from 'moment';
import React from 'react';

import deleteIcon from 'Assets/icons/btn-cancel.svg';

import rightArrow from 'Assets/icons/btn-large-arrow-right.svg';

import CardGrid from '../CardGrid';
import DayIndex from './components/DayIndex';
import HiddenInput from '../HiddenInput';
import ImageCustom from './components/Image';
import RepeatContainer from './components/RepeatContainer';
import RepeatValue from './components/RepeatValue';
import DateTimeValue from './components/DateTimeValue';
import DateTimeWrapper from './components/DateTimeWrapper';

import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledImage = styled(Image)`
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
`;

class Day extends React.Component {
  render() {
    const {
      startDate,
      startTime,
      initialDate,
      endTime,
      dayIndex,
      initialStartTime,
      onValueChange,
      repetitions,
      onBlur,
      dateTimeValue,
      endTimeValue,
      onDeleteDay,
      index,
    } = this.props;
    return (
      <CustomColumn noPadding width={16}>
        <Divider>
          <FormattedMessage id="booking.create.day" />
          <DayIndex>{index + 1}</DayIndex>
          {index + 1 > 1 && (
            <DeleteButton onClick={onDeleteDay(dayIndex)}>
              <StyledImage src={deleteIcon} />
            </DeleteButton>
          )}
        </Divider>

        <CardGrid>
          <CustomRow padding="1.667rem 0 0.8335rem 0">
            <CustomColumn width={5}>
              <InlineText primaryFont>
                <FormattedMessage id="booking.create.day.start" />
              </InlineText>
            </CustomColumn>
            <CustomColumn padding="0 0 0 1em" textAlign="right" width={11}>
              <DateTimeWrapper>
                <DateTimeValue onClick={this.onStartDateOrTimeClick}>
                  {moment(startDate).format('dd. DD MMMM')}
                </DateTimeValue>
                <HiddenInput
                  name="startDate"
                  onChange={onValueChange(dayIndex, 'dateTime')}
                  onBlur={onBlur('startDateAndTime')}
                  value={dateTimeValue}
                  type="datetime-local"
                  min={`${initialDate}T${initialStartTime}`}
                />
                <DateTimeValue onClick={this.onStartDateOrTimeClick}>
                  {startTime}
                </DateTimeValue>
              </DateTimeWrapper>
            </CustomColumn>
          </CustomRow>
          <CustomRow padding="0.8335rem 0">
            <CustomColumn width={12}>
              <InlineText primaryFont>
                <FormattedMessage id="booking.create.day.end" />
              </InlineText>
            </CustomColumn>
            <CustomColumn textAlign="right" width={4}>
              <DateTimeValue>{endTime}</DateTimeValue>
              <HiddenInput
                name="endTime"
                onBlur={onBlur('endTime')}
                onChange={onValueChange(dayIndex, 'endTime')}
                value={endTimeValue}
                type="time"
              />
            </CustomColumn>
          </CustomRow>
          <CustomRow padding="0.8335rem 0">
            <CustomColumn width={11}>
              <InlineText primaryFont>
                <FormattedMessage id="booking.create.day.repeat" />
              </InlineText>
            </CustomColumn>
            <CustomColumn verticalAlign="bottom" textAlign="right" width={5}>
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
                <ImageCustom src={rightArrow} />
              </RepeatContainer>
            </CustomColumn>
          </CustomRow>
        </CardGrid>
      </CustomColumn>
    );
  }
}

export default Day;
