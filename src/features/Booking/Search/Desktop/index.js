import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Image, Segment, Modal } from 'semantic-ui-react';

import {
  getAvailableAngels,
  getSelectedAngels,
  getNotMatched,
  getMatched,
  getNumberOfActiveFilters,
} from '../../data/selectors.js';
import {
  onAngelSelect,
  clearSelectedAngels,
  onGetAngelsForBooking,
  onSetSelectedAngels,
  onAddAngelsToBooking,
} from '../../data/actions';
import { isAngelSelected } from 'Utils';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { onClearDays } from '../../Create/actions';
import { onErrorConfirm } from '../../../../ui/actions';
import InfiniteScroll from 'react-infinite-scroller';
import BasicButton from 'Components/Buttons/Basic';
import Confirmation from './components/Confirmation';
import CustomColumn from 'Components/CustomColumn';
import Divider from 'Components/Divider';
import DesktopError from 'Components/DesktopError';
import { ProgressiveFacebook } from 'Components/Progressive';
import React, { Component } from 'react';
import Navigation from 'Components/Navigation';
import anime from 'animejs';

import btnAddIcon from 'Assets/icons/btn-check-off.svg';
import checkedIcon from 'Assets/icons/btn-check-on.svg';
import filterIcon from 'Assets/icons/btn-filter.svg';

import AddBtn from '../components/AddBtn';
import AngelFeatures from '../components/AngelFeatures';
import AngelImage from '../components/AngelImage';
import AngelsListItem from '../components/AngelsListItem';
import FilterContainer from '../components/FilterContainer';
import FilterCounter from '../components/FilterCounter';
import SelectedAngels from '../components/SelectedAngels';
import Filters from '../../Filters/Desktop';

class BookingSearch extends Component {
  confirmationRef = React.createRef();
  static defaultProps = {
    availableAngels: [],
    selectedAngels: [],
  };

  state = {
    showFilters: false,
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

  fetchMoreAngels = list => page => {
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

  toggleFilters = () => {
    this.setState(state => {
      return {
        ...state,
        showFilters: !state.showFilters,
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal open={this.state.showFilters} size="mini">
          <Filters toggleFilters={this.toggleFilters} />
        </Modal>
        <Navigation
          isWhite
          withBorder
          title={<FormattedMessage id="booking.search.navTitle" />}
          onBack={this.onNavBack}
          rightComp={() => (
            <FilterContainer onClick={this.toggleFilters}>
              <FilterCounter>{this.props.numberOfActiveFilters}</FilterCounter>
              <div>
                <FormattedMessage id="booking.search.filter" />
              </div>
              <div>
                <Image avatar src={filterIcon} />
              </div>
            </FilterContainer>
          )}
        />
        <DesktopError
          errors={this.props.errors}
          onErrorConfirm={this.props.onErrorConfirm(this.props.history)}
        />
        {this.props.isLoading &&
        !this.props.availableAngels.length &&
        this.props.location.pathname === '/booking/search' ? (
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
        ) : null}
        {this.props.availableAngels.length > 0 &&
        this.props.numberOfActiveFilters === 0 ? (
          <div style={{ height: '100vh', overflowY: 'auto' }}>
            <InfiniteScroll
              useWindow={false}
              element="div"
              style={{ width: '100%' }}
              pageStart={0}
              loadMore={this.fetchMoreAngels('availableAngels')}
              hasMore={this.state.availableAngels.hasMore}
            >
              {this.renderListOfAngels()}
            </InfiniteScroll>
          </div>
        ) : null}
        {this.props.match.length > 0 && this.props.numberOfActiveFilters > 0 ? (
          <div
            style={{ height: '100vh', overflowY: 'auto' }}
            ref={this.scrollerParentMatched}
          >
            <Divider margin="0" padding="0">
              <FormattedMessage id="booking.search.matched" />
            </Divider>

            <InfiniteScroll
              useWindow={false}
              pageStart={0}
              loadMore={this.fetchMoreAngels('match')}
              hasMore={this.state.match.hasMore}
            >
              {this.renderListOfMatched()}
            </InfiniteScroll>
          </div>
        ) : null}
        {this.props.notMatch.length > 0 &&
        this.props.numberOfActiveFilters > 0 ? (
          <Segment basic vertical>
            <div style={{ height: '30vh', overflowY: 'auto' }}>
              <Divider margin="0" padding="0">
                <FormattedMessage id="booking.search.notMatched" />
              </Divider>

              <InfiniteScroll
                useWindow={false}
                pageStart={0}
                loadMore={this.fetchMoreAngels('notMatch')}
                hasMore={this.state.notMatch.hasMore}
              >
                {this.renderListOfNotMatched()}
              </InfiniteScroll>
            </div>
          </Segment>
        ) : null}
        {!this.props.errors ? (
          <Confirmation>
            <SelectedAngels selectedAngels={this.props.selectedAngels} />
            <BasicButton onClick={this.onAddAngels} fluid primary>
              <FormattedMessage id="booking.search.btn" />
            </BasicButton>
          </Confirmation>
        ) : null}
      </React.Fragment>
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
