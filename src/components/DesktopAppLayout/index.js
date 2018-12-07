import { Grid, Container, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import curry from 'ramda/es/curry';
import FullHeight from 'Components/FullHeight';
import FullHeightWidth from 'Components/FullHeightWidth';
import memoizeWith from 'ramda/es/memoizeWith';
import React, { Fragment, PureComponent } from 'react';
import WithRole from 'Components/WithRole';

import logo2 from 'Assets/images/logo2.png';

import AddBookingBtn from './components/AddBookingBtn';
import UpdateCalendarBtn from './components/UpdateCalendarBtn';
import DoNotDisturbBtn from './components/DoNotDisturbBtn';
import WhiteColumn from './components/WhiteColumn';
import HeaderContainer from './components/HeaderContainer';
import Logo from './components/Logo';
import CustomMenuItem from './components/CustomMenuItem';
import RowContainer from './components/RowContainer';
import CustomGrid from './components/CustomGrid';
import { getDisturbModeStatus } from './selectors';

const navigate = memoizeWith(
  (_, path) => path,
  curry((history, path, _ev) => {
    history.push(path);
  })
);

const renderMenuItems = (role, history, pathname) => {
  const familyRoutes = [
    {
      active: pathname.startsWith('/booking'),
      name: 'Bookings',
      onClick: navigate(history, '/booking'),
    },
    {
      active: pathname.includes('favorites'),
      name: 'Favorites',
      onClick: navigate(history, '/favorites'),
    },
    {
      active: pathname.includes('payments'),
      name: 'Payments',
      onClick: navigate(history, '/payments'),
    },
    /*{
      active: pathname.startsWith('/calendar'),
      name: 'Calendar',
      onClick: navigate(history, '/calendar/availability'),
    },*/
  ];
  const angelRoutes = [
    {
      active: pathname.startsWith('/booking'),
      name: 'Bookings',
      onClick: navigate(history, '/booking'),
    },
    {
      active: pathname.startsWith('/families'),
      name: 'Families',
      onClick: navigate(history, '/families'),
    },
    {
      active: pathname.includes('payments'),
      name: 'Payments',
      onClick: navigate(history, '/payments'),
    },
    {
      active: pathname.startsWith('/calendar'),
      name: 'Calendar',
      onClick: navigate(history, '/calendar'),
    },
  ];

  if (role === 'family') {
    return familyRoutes.map((route, i) => {
      return (
        <CustomMenuItem
          key={i}
          active={route.active}
          name={route.name}
          onClick={route.onClick}
        />
      );
    });
  } else {
    return angelRoutes.map((route, i) => {
      return (
        <CustomMenuItem
          key={i}
          active={route.active}
          name={route.name}
          onClick={route.onClick}
        />
      );
    });
  }
};

class DesktopAppLayout extends PureComponent {
  static LeftColumn = ({ children, isWhite = false, noPadding, padding }) => {
    return (
      <WhiteColumn
        tablet={16}
        mobile={16}
        widescreen={8}
        computer={8}
        isWhite={isWhite}
      >
        {children}
      </WhiteColumn>
    );
  };
  static RightColumn = ({ children, isWhite = true , onBack, colRight }) => {
    return (
      <WhiteColumn isWhite = {isWhite} widescreen={7} computer={7} tablet={16} mobile={16} >
        {children}
      </WhiteColumn>
    );
  };

  render() {
    const {
      history,
      children,
      location: { pathname },
      disturb,
    } = this.props;

    return (
      <Fragment>
        <HeaderContainer>
          <WithRole>
            {role => (
              <Grid container>
                <Grid.Row as={RowContainer} textAlign="right">
                  <Grid.Column width={16}>
                    <Menu secondary floated="right">
                      {role === 'angel' && (
                        <CustomMenuItem
                          name="disturb"
                          active={pathname.includes('unavailable')}
                          onClick={navigate(history, '/calendar/unavailable')}
                        >
                          <DoNotDisturbBtn isInDisturbMode={Boolean(disturb)} />
                        </CustomMenuItem>
                      )}
                      <CustomMenuItem
                        name="Credit"
                        // active={pathname.includes('credit')}
                        onClick={navigate(history, '/profile/credit')}
                      />
                      <CustomMenuItem
                        name="Support"
                        active={pathname.includes('support')}
                        onClick={
                          role === 'angel'
                          // ? navigate(history, '/calendar/support')
                            ? navigate(history, '/support1')
                            : navigate(
                                history,
                                // '/calendar/availability/support'
                                '/support1'
                              )
                        }
                      />
                      <CustomMenuItem
                        name="Profile"
                        active={pathname.includes('profile')}
                        onClick={navigate(history, '/profile')}
                      />
                    </Menu>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row as={RowContainer}>
                  <Menu secondary fluid>
                    <Menu.Item>
                      <Logo src={logo2} />
                    </Menu.Item>
                    {renderMenuItems(role, history, pathname)}
                    {role === 'family' ? (
                      <CustomMenuItem
                        position="right"
                        onClick={navigate(history, '/booking/create')}
                      >
                        <AddBookingBtn />
                      </CustomMenuItem>
                    ) : (
                      <CustomMenuItem
                        position="right"
                        onClick={navigate(history, '/calendar/add')}
                      >
                        <UpdateCalendarBtn />
                      </CustomMenuItem>
                    )}
                  </Menu>
                </Grid.Row>
              </Grid>
            )}
          </WithRole>
        </HeaderContainer>
        <Container as={FullHeightWidth}>
          <CustomGrid centered columns={2} as={FullHeight}>
            {children}
          </CustomGrid>
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(state => ({
    disturb: getDisturbModeStatus(state),
  }))(DesktopAppLayout)
);
