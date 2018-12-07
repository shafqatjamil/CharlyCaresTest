import { Menu, Image, Header } from 'semantic-ui-react';
import { isIOS } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import backArrow from 'Assets/icons/back.svg';
import closeIcon from 'Assets/icons/close.svg';

const CNavigation = ({ border, withDays, noBPadding, ...rest }) => {
  return <Menu {...rest} />;
};

const Navigation = styled(CNavigation)`
  &&& {
    box-shadow: none;
    border: none;
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
    min-width: 100%;
    min-height: 2.8125rem;
    border-bottom: ${props => props.border && '1px solid #e6e6e6'};
    transition: height 200ms ease-in, width 200ms ease-in;
    ${isIOS && 'padding-top: 1.7125rem;'};
    padding-bottom: ${props =>
      props.withDays
        ? '1.5rem'
        : props.noBPadding
          ? 0
          : isIOS
            ? '0.5rem'
            : null};
  }
`;

const NavigationItemLeft = styled(Menu.Item)`
  &&& {
    padding: 0 0 0 0.9rem;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
  }
`;

const NavigationItemRight = styled(Menu.Item)`
  &&& {
    padding: ${props => (props.paddingrightitem ? props.paddingrightitem : '0 1rem 0 0')};
    justify-content: flex-end;
    align-items: center !important;
    flex: 1.2;
  }
`;

const NavigationItemCenter = styled(Menu.Item)`
  &&& {
    display: flex;
    align-items: center !important;
    justify-content: center;
    padding: 0;

    margin: ${props => (props.margincenteritem ? props.margincenteritem : '0')};
    
    flex: ${props => (props.flexcenteritem ? props.flexcenteritem : '3')};
  }
`;
const CNavigationHeading = ({ longTitle, ...rest }) => <Header {...rest} />;
const NavigationHeading = styled(CNavigationHeading)`
  &&& {
    ${props => props.longTitle && 'font-size: 1.2rem;'};
    & > .sub.header {
      font-size: 0.875rem;
      vertical-align: bottom;
    }
  }
`;
const NavigationSubHeading = styled(Header.Subheader)`
  &&& {
    font-family: ${props => props.theme.secondaryFont};
  }
`;

const CustomArrow = styled(Image)`
  &&& {
    width: 24px;
    height: 24px;
  }
`;

const CustomClose = CustomArrow.extend`
  &&& {
    width: 44px;
    height: 44px;
  }
`;

const DaysInWeekContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;

  align-items: center;
  padding: 0 1rem;
`;

const Day = styled.div`
  margin-right: 4.28%;
  width: 10.5%;
  text-align: center;

  &:last-child {
    margin-right: 0;
  }
`;

const getWeekDays = () => {
  return moment.weekdays(true).map(day => {
    return day[0].toUpperCase();
  });
};

const NavigationHeader = ({
  onBack,
  onClose,
  leftComponent,
  rightComponent,
  title,
  subTitle,
  border,
  noBPadding,
  withDays,
  flexcenteritem,
  paddingrightitem,
  margincenteritem
}) => {
  return (
    <Navigation
      noBPadding={noBPadding}
      withDays={withDays}
      fixed="top"
      border={border}
      borderless
    >
      <NavigationItemLeft position="left">
        {leftComponent ? (
          leftComponent()
        ) : onClose ? (
          <CustomClose onClick={onClose} src={closeIcon} />
        ) : (
          onBack && <CustomArrow onClick={onBack} src={backArrow} />
        )}
      </NavigationItemLeft>
      {title && typeof title === 'function' ? (
        <NavigationItemCenter>
          <NavigationHeading>{title()}</NavigationHeading>
        </NavigationItemCenter>
      ) : (
        <NavigationItemCenter margincenteritem={margincenteritem} flexcenteritem={flexcenteritem}>
          <NavigationHeading textAlign="center">
            {title}
            {subTitle && (
              <NavigationSubHeading> {subTitle} </NavigationSubHeading>
            )}
          </NavigationHeading>
        </NavigationItemCenter>
      )}
      <NavigationItemRight paddingrightitem={paddingrightitem} position="right">
        {rightComponent && rightComponent()}
      </NavigationItemRight>
      {withDays && (
        <DaysInWeekContainer>
          {getWeekDays().map((letter, i) => (
            <Day key={i}>{letter}</Day>
          ))}
        </DaysInWeekContainer>
      )}
    </Navigation>
  );
};

NavigationHeader.defaultProps = {
  backButton: false,
  onBack: () => {},
};

export default NavigationHeader;
