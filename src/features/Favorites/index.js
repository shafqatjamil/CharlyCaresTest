import { connect } from 'react-redux';
import { FamilyTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import { ProgressiveFacebook, TimerLoader } from 'Components/Progressive';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import moment from 'moment';
import React, { Component } from 'react';

import { getFavorites, getActiveBabysitting } from './selectors';
import { getLoadingStatus, getErrors } from '../../ui/selectors';
import { onGetFavoritesAndActiveBabysitting } from './actions';
import ActiveBabysitting from './components/ActiveBabysitting';
import AngelsList from './components/AngelsList';
import Filter from './components/FilterButton';

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
      <Layout
        navTitle={<FormattedMessage id="favorites.family.navTitle" />}
        navBorder
        navLeftComponent={() => (
          <CustomLink to="/edit">
            <FormattedMessage id="navigation.edit" />
          </CustomLink>
        )}
      >
        <Error
          errors={this.props.errors}
          onRetry={this.props.onGetFavoritesAndActiveBabysitting}
        />
        <ContentWrapper>
          <CustomRow noPadding>
            {this.props.isLoading ? (
              <CustomColumn>
                <TimerLoader isLoading={true} />
                <ProgressiveFacebook isLoading={true} />
              </CustomColumn>
            ) : (
              <CustomColumn noPadding>
                {this.props.activeBabysitting !== null &&
                this.props.activeBabysitting.end_time ? (
                  <ActiveBabysitting
                    history={this.props.history}
                    activeBabysitting={this.props.activeBabysitting}
                  />
                ) : null}
                <Divider right padding="0px">
                  <Filter
                    value={this.state.filterType}
                    onFilterChange={this.onFilterChange}
                  />
                </Divider>
                <AngelsList
                  history={this.props.history}
                  favorites={this.state.sorted}
                />
              </CustomColumn>
            )}
          </CustomRow>
          <EmptyCell padding="4rem 0" />
        </ContentWrapper>
        <FamilyTabBar />
      </Layout>
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
