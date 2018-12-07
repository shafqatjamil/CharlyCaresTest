import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Image } from 'semantic-ui-react';

import {
  getAvailableAngels,
  getSelectedAngels,
  getNotMatched,
  getMatched,
  getNumberOfActiveFilters,
} from '../data/selectors';
import {
  onAngelSelect,
  clearSelectedAngels,
  onGetAngelsForBooking,
  onSetSelectedAngels,
  onAddAngelsToBooking,
} from '../data/actions';
import { isAngelSelected } from 'Utils';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { onClearDays } from '../Create/actions';
import { onErrorConfirm } from '../../../ui/actions';
import InfiniteScroll from 'react-infinite-scroller';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from 'Components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import { ProgressiveFacebook } from 'Components/Progressive';
import React, { Component } from 'react';
import anime from 'animejs';

import btnAddIcon from 'Assets/icons/btn-check-off.svg';
import checkedIcon from 'Assets/icons/btn-check-on.svg';
import filterIcon from 'Assets/icons/btn-filter.svg';

import AddBtn from './components/AddBtn';
import AngelFeatures from './components/AngelFeatures';
import AngelImage from './components/AngelImage';
import AngelsListItem from './components/AngelsListItem';
import FilterContainer from './components/FilterContainer';
import FilterCounter from './components/FilterCounter';
import SelectedAngels from './components/SelectedAngels';

class BookingSearch extends Component {
  confirmationRef = React.createRef();

  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.from === 'bookingDetails'
    ) {
      this.props.onGetAngelsForBooking(this.props.location.state.bookingId);
    }
    this.animation = anime({
      targets: this.confirmationRef.current,
      translateY: [127, 0],
      opacity: [0.3, 1],
      easing: 'linear',
      duration: 600,
      autoplay: false,
    });
  }

  static defaultProps = {
    availableAngels: [],
    selectedAngels: [],
  };

  state = {
    availableAngels: {
      items: [],
      start: 0,
      end: 5,
      hasMore: true,
    },
    match: {
      items: [],
      start: 0,
      end: 5,
      hasMore: true,
    },
    notMatch: {
      items: [],
      start: 0,
      end: 5,
      hasMore: true,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.availableAngels &&
      (this.state.availableAngels.items.length &&
        prevState.availableAngels.items.length === 0)
    ) {
      this.animation.play();
    }
  }

  renderListOfAngels = () => {
    if (this.props.availableAngels.length > 0) {
      return this.state.availableAngels.items.map(angel => (
        <div key={angel.angel_id}>
          <AngelsListItem key={angel.angel_id}>
            <AngelImage
              id={angel.angel_id}
              liked={angel.is_liked}
              image={angel.image}
              history={this.props.history}
            />
            <AngelFeatures
              angelId={angel.angel_id}
              name={angel.first_name}
              age={angel.birthdate}
              rating={angel.average_rating}
              avgResponse={angel.response_time}
              distance={angel.distance}
              dailyPrice={angel.normal_rate}
              nightlyPrice={angel.extra_rate}
              connections={angel.connections}
              baby={angel.small_child_expertise === 1 ? true : false}
              history={this.props.history}
            />
            <AddBtn
              onClick={this.onAngelSelect(this.props.selectedAngels, angel)}
            >
              <Image
                src={
                  isAngelSelected(this.props.selectedAngels, angel.angel_id)
                    ? checkedIcon
                    : btnAddIcon
                }
              />
            </AddBtn>
          </AngelsListItem>

          <Divider minheight={'0.5rem'} />
        </div>
      ));
    }
  };

  renderListOfMatched = () => {
    if (this.props.match.length > 0) {
      return this.state.match.items.map(angel => (
        <AngelsListItem key={angel.angel_id}>
          <AngelImage
            id={angel.angel_id}
            liked={angel.is_liked}
            image={angel.image}
          />
          <AngelFeatures
            name={angel.first_name}
            age={angel.birthdate}
            rating={angel.average_rating}
            avgResponse={angel.response_time}
            distance={angel.distance}
            dailyPrice={angel.normal_rate}
            nightlyPrice={angel.extra_rate}
            connections={angel.connections}
            baby={angel.small_child_expertise === 1 ? true : false}
          />
          <AddBtn
            onClick={this.onAngelSelect(this.props.selectedAngels, angel)}
          >
            <Image
              src={
                isAngelSelected(this.props.selectedAngels, angel.angel_id)
                  ? checkedIcon
                  : btnAddIcon
              }
            />
          </AddBtn>
        </AngelsListItem>
      ));
    }
  };

  renderListOfNotMatched = () => {
    if (this.props.notMatch.length > 0) {
      return this.state.notMatch.items.map(angel => (
        <AngelsListItem key={angel.angel_id}>
          <AngelImage
            id={angel.angel_id}
            liked={angel.is_liked}
            image={angel.image}
          />
          <AngelFeatures
            name={angel.first_name}
            age={angel.birthdate}
            rating={angel.average_rating}
            avgResponse={angel.response_time}
            distance={angel.distance}
            dailyPrice={angel.normal_rate}
            nightlyPrice={angel.extra_rate}
            connections={angel.connections}
            baby={angel.small_child_expertise === 1 ? true : false}
          />
          <AddBtn
            onClick={this.onAngelSelect(this.props.selectedAngels, angel)}
          >
            <Image
              src={
                isAngelSelected(this.props.selectedAngels, angel.angel_id)
                  ? checkedIcon
                  : btnAddIcon
              }
            />
          </AddBtn>
        </AngelsListItem>
      ));
    }
  };

  fetchMoreAngels = list => () => {
    if (this.state[list].items.length + 5 >= this.props[list].length) {
      this.setState(prevState => {
        return {
          ...prevState,
          [list]: {
            ...prevState[list],
            hasMore: false,
            start: prevState[list].end,
            end:
              prevState[list].end +
              (this.props[list].length - prevState[list].end),
          },
        };
      });
      this.setState(prevState => ({
        ...prevState,
        [list]: {
          ...prevState[list],
          items: prevState[list].items.concat(
            this.props[list].slice(this.state[list].start, this.state[list].end)
          ),
        },
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        [list]: {
          ...prevState[list],
          start: prevState[list].end,
          end: prevState[list].end + 5,
        },
      }));
      this.setState(prevState => ({
        ...prevState,
        [list]: {
          ...prevState[list],
          items: prevState[list].items.concat(
            this.props[list].slice(this.state[list].start, this.state[list].end)
          ),
        },
      }));
    }
  };

  onSend = () => {
    this.props.history.push('/booking/send');
  };

  onAddAngels = () => {
    if (
      this.props.location.state &&
      this.props.location.state.from === 'bookingDetails'
    ) {
      const {
        location,
        onAddAngelsToBooking,
        history,
        selectedAngels,
      } = this.props;

      const payload = {
        booking_id: location.state.bookingId,
        angel_ids: selectedAngels.map(angel => {
          const data = location.state.angels.find(a => a.id === angel.id);
          return !data && angel.id;
        }),
      };

      onAddAngelsToBooking(history, location.state.bookingId, payload);
    } else {
      this.onSend();
    }
  };

  onMoreInfo = id => () => {
    this.props.history.push(`/booking/angel/${id}`);
  };

  onAngelSelect = (selectedAngels, angel) => () => {
    const position = this.props.availableAngels.reduce((acc, curr, index) => {
      if (curr.user_id === angel.user_id) {
        acc = index;
      }
      return acc;
    }, -1);

    this.props.onAngelSelect(selectedAngels, angel, position);
  };

  onNavBack = () => {
    this.props.history.goBack();
    this.props.onClearSelectedAngels();
    this.props.onClearDays();
  };

  render() {
    return (
      <Layout
        paddingrightitem="0px 0.5rem 0px 0px"
        flexcenteritem="2"
        marginBottom="7em"
        margincenteritem="3% 0px 0px 0px"
        navTitle={<FormattedMessage id="booking.search.navTitle" />}
        navBorder
        onNavBack={this.onNavBack}
        navRightComponent={() => (
          <CustomLink fontSize="1rem" primary to="/booking/filters">
            <FilterContainer>
              <FilterCounter>{this.props.numberOfActiveFilters}</FilterCounter>
              <div>
                <FormattedMessage id="booking.search.filter" />
              </div>
              <div>
                <Image avatar src={filterIcon} />
              </div>
            </FilterContainer>
          </CustomLink>
        )}
      >
        <Error
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm(this.props.history)}
        />
        <CustomRow padding="1.5rem 0 0 0">
          <CustomColumn noPadding>
            {this.props.isLoading && !this.props.selectedAngels.length ? (
              <Grid container>
                <Grid.Row>
                  <CustomColumn padding="2rem 0 0 0">
                    <ProgressiveFacebook
                      isLoading={this.props.isLoading}
                      width={310}
                      height={150}
                    />
                  </CustomColumn>
                </Grid.Row>
              </Grid>
            ) : this.props.isLoading && this.props.selectedAngels.length ? (
              <Loader />
            ) : null}
            {!this.props.isLoading &&
            this.props.availableAngels.length > 0 &&
            this.props.numberOfActiveFilters === 0 ? (
              <Grid>
                <Grid.Row>
                  <InfiniteScroll
                    element="ul"
                    style={{
                      width: '100%',
                      padding: 0,
                      margin: 0,
                      listStyle: 'none',
                    }}
                    pageStart={0}
                    loadMore={this.fetchMoreAngels('availableAngels')}
                    hasMore={this.state.availableAngels.hasMore}
                  >
                    {this.renderListOfAngels()}
                  </InfiniteScroll>
                </Grid.Row>
              </Grid>
            ) : null}
            {!this.props.isLoading &&
            this.props.match.length > 0 &&
            this.props.numberOfActiveFilters > 0 ? (
              <div>
                <Divider>
                  <FormattedMessage id="booking.search.matched" />
                </Divider>
                <Grid>
                  <Grid.Row>
                    <InfiniteScroll
                      element="ul"
                      style={{
                        width: '100%',
                        padding: 0,
                        margin: 0,
                        listStyle: 'none',
                      }}
                      pageStart={0}
                      loadMore={this.fetchMoreAngels('match')}
                      hasMore={this.state.match.hasMore}
                    >
                      {this.renderListOfMatched()}
                    </InfiniteScroll>
                  </Grid.Row>
                </Grid>
              </div>
            ) : null}
            {!this.props.isLoading &&
            this.props.notMatch.length > 0 &&
            this.props.numberOfActiveFilters > 0 ? (
              <div>
                <Divider>
                  <FormattedMessage id="booking.search.notMatched" />
                </Divider>
                <Grid>
                  <Grid.Row>
                    <InfiniteScroll
                      element="ul"
                      style={{
                        width: '100%',
                        padding: 0,
                        margin: 0,
                        listStyle: 'none',
                      }}
                      pageStart={0}
                      loadMore={this.fetchMoreAngels('notMatch')}
                      hasMore={this.state.notMatch.hasMore}
                    >
                      {this.renderListOfNotMatched()}
                    </InfiniteScroll>
                  </Grid.Row>
                </Grid>
              </div>
            ) : null}
          </CustomColumn>
        </CustomRow>
        <Confirmation innerRef={this.confirmationRef}>
          <SelectedAngels selectedAngels={this.props.selectedAngels} />
          <BasicButton onClick={this.onAddAngels} fluid primary>
            <FormattedMessage id="booking.search.btn" />
          </BasicButton>
        </Confirmation>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  availableAngels: getAvailableAngels(state),
  selectedAngels: getSelectedAngels(state),
  match: getMatched(state),
  notMatch: getNotMatched(state),
  numberOfActiveFilters: getNumberOfActiveFilters(state),
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
});

const mapDispatchToProps = dispatch => ({
  onClearDays: () => dispatch(onClearDays()),
  onAngelSelect: (selectedAngels, angel, position) =>
    dispatch(onAngelSelect(selectedAngels, angel, position)),
  onErrorConfirm: history => () => {
    history.goBack();
    dispatch(onErrorConfirm());
  },
  onClearSelectedAngels: () => dispatch(clearSelectedAngels()),
  onGetAngelsForBooking: bookingId =>
    dispatch(onGetAngelsForBooking(bookingId)),
  onSetSelectedAngels: angels => dispatch(onSetSelectedAngels(angels)),
  onAddAngelsToBooking: (history, bookingId, payload) =>
    dispatch(onAddAngelsToBooking(history, bookingId, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingSearch);
