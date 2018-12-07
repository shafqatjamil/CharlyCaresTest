import { connect } from 'react-redux';
import { ProgressiveFacebook, TimerLoader } from 'Components/Progressive';
import { Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import moment from 'moment';
import React, { Component, Fragment } from 'react';

import { getFavorites, getActiveBabysitting } from '../selectors';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onGetFavoritesAndActiveBabysitting } from '../actions';
import ActiveBabysitting from '../components/ActiveBabysitting';
import Angel from '../../Angel/Desktop';
import AngelsList from '../components/AngelsList';
import Chat from '../../Chat/Desktop';
import Filter from '../components/FilterButton';

class Favorites extends Component {
  state = {
    filterType: 0,
    sorted: [],
  };

  componentDidMount() {
    this.props.onGetFavoritesAndActiveBabysitting();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sorted.length === 0 && this.props.favorites.length > 0) {
      this.filterByLastBooking();
    }
  }

  onFilterChange = e => {
    switch (Number(e.target.value)) {
      case 0:
        this.filterByLastBooking();
        break;
      case 1:
        this.filterAlphabetical();
        break;
      case 2:
        this.filterByResponseTime();
        break;
      case 3:
        this.filterByPrice('asc');
        break;
      case 4:
        this.filterByPrice('desc');
        break;

      default:
        break;
    }
  };
  filterByLastBooking = () => {
    const sorted = [...this.props.favorites].sort((current, next) => {
      if (
        !moment(current.accepted_at).isValid() ||
        moment(next.accepted_at) > moment(current.accepted_at)
      ) {
        return 1;
      }
      if (
        !moment(next.accepted_at).isValid() ||
        moment(current.accepted_at) > moment(next.accepted_at)
      ) {
        return 0;
      }
    });
    this.setState({
      sorted,
      filterType: 0,
    });
  };
  filterAlphabetical = () => {
    const sorted = [...this.props.favorites].sort((current, next) => {
      const currentName = current.first_name.toUpperCase();
      const nextName = next.first_name.toUpperCase();
      if (currentName > nextName) {
        return 1;
      }
      if (nextName > currentName) {
        return -1;
      }

      return 0;
    });
    this.setState({
      sorted,
      filterType: 1,
    });
  };
  filterByResponseTime = () => {
    const sorted = [...this.props.favorites].sort((current, next) => {
      if (current.response_time > next.response_time) {
        return 1;
      }
      if (next.response_time > current.response_time) {
        return -1;
      }

      return 0;
    });
    this.setState({
      sorted,
      filterType: 1,
    });
  };
  filterByPrice = type => {
    const sortFunc = (current, next) => {
      const currentAngelRate = Number(current.normal_rate);
      const nextAngelRate = Number(next.normal_rate);
      if (type === 'asc') {
        if (currentAngelRate > nextAngelRate) {
          return 1;
        }
        if (nextAngelRate > currentAngelRate) {
          return -1;
        }
        return 0;
      } else {
        if (currentAngelRate > nextAngelRate) {
          return -1;
        }
        if (nextAngelRate > currentAngelRate) {
          return 1;
        }
        return 0;
      }
    };
    const sorted = [...this.props.favorites].sort(sortFunc);
    this.setState({
      sorted,
      filterType: 1,
    });
  };

  render() {
    return (
      <DesktopAppLayout>
        <DesktopAppLayout.LeftColumn>
          <Fragment>
            {this.props.isLoading &&
            this.props.location.pathname === '/favorites' &&
            !this.state.sorted.length ? (
              <Segment basic vertical>
                <TimerLoader isLoading={true} />
                <ProgressiveFacebook isLoading={true} />
              </Segment>
            ) : (
              <React.Fragment>
                {this.props.activeBabysitting !== null &&
                this.props.activeBabysitting.end_time ? (
                  <ActiveBabysitting
                    history={this.props.history}
                    activeBabysitting={this.props.activeBabysitting}
                  />
                ) : null}
                <Filter
                  value={this.state.filterType}
                  onFilterChange={this.onFilterChange}
                />
                <AngelsList
                  history={this.props.history}
                  favorites={this.state.sorted}
                />
              </React.Fragment>
            )}
          </Fragment>
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn>
          <TransitionGroup>
            <CSSTransition
              classNames="desktop"
              unmountOnExit
              mountOnEnter
              timeout={{ enter: 600, exit: 600 }}
              key={this.props.location.key || this.props.location.pathname}
            >
              <Switch>
                <Route path="/favorites/angel/:id" component={Angel} />
                <Route path="/favorites/chat/:userId" component={Chat} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </DesktopAppLayout.RightColumn>
      </DesktopAppLayout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  favorites: getFavorites(state),
  activeBabysitting: getActiveBabysitting(state),
});

const mapDispatchToProps = dispatch => ({
  onGetFavoritesAndActiveBabysitting: () =>
    dispatch(onGetFavoritesAndActiveBabysitting()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
