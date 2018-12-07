import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ProgressiveFamilies } from 'Components/Progressive';
import { Segment } from 'semantic-ui-react';
import DesktopError from 'Components/DesktopError';
import InfiniteScroll from 'react-infinite-scroller';
import React from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import { getFamilies } from '../../data/selectors';
import { getLoadingStatus, getErrors } from '../../../../ui/selectors';
import { getUserId } from '../selectors';
import { onGetFamilies } from '../../data/actions';
import FamilyList from '../components/FamilyList';
import ListItem from '../components/ListItem';

class Families extends React.Component {
  state = {
    hasMore: true,
    totalNumOfPages:
      this.props.families.length > 0
        ? Math.ceil(this.props.families.length / 5)
        : 0,
    jumpBy: 5,
    families: [],
    currentIndex: 0,
  };

  componentDidMount() {
    this.props.onGetFamilies();
  }

  onRetry = () => {
    this.props.onGetFamilies();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.totalNumOfPages === 0 &&
      this.props.families !== prevProps.families
    ) {
      this.setState({
        totalNumOfPages: Math.ceil(this.props.families.length / 5),
      });
    }
  }

  loadMore = page => {
    if (!this.state.totalNumOfPages) return;
    if (page >= this.state.totalNumOfPages) {
      this.setState(prevState => {
        return {
          hasMore: false,
          families: [
            ...prevState.families,
            ...this.props.families.slice(
              this.state.currentIndex,
              this.props.families.length
            ),
          ],
          currentIndex: this.props.families.length - 1,
        };
      });
    } else {
      this.setState(prevState => {
        return {
          families: [
            ...prevState.families,
            ...this.props.families.slice(
              prevState.currentIndex,
              prevState.currentIndex + this.state.jumpBy
            ),
          ],
          currentIndex: prevState.families.length + this.state.jumpBy,
        };
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ProgressiveFamilies
          isLoading={this.props.isLoading && !this.props.families.length}
        />
        <ProgressiveFamilies
          isLoading={this.props.isLoading && !this.props.families.length}
        />
        <DesktopError errors={this.props.errors} onRetry={this.onRetry} />
        <Segment basic vertical>
          <FormattedMessage id="families.sortingText" />
        </Segment>

        {this.props.families.length && this.props.families.length > 0 ? (
          <FamilyList>
            <InfiniteScroll
              pageStart={1}
              loadMore={this.loadMore}
              hasMore={this.state.hasMore}
              loader={<ScrollerLoader key={9999} />}
            >
              {this.state.families.map(fam => {
                return (
                  <ListItem angelId={fam.user_id} key={fam.id} family={fam} />
                );
              })}
            </InfiniteScroll>
          </FamilyList>
        ) : null}
      </React.Fragment>
    );
  }

  static defaultProps = {
    families: [],
    errors: null,
    isLoading: false,
  };
}

export default connect(
  state => ({
    isLoading: getLoadingStatus(state),
    errors: getErrors(state),
    families: getFamilies(state),
    userId: getUserId(state),
  }),
  {
    onGetFamilies,
  }
)(Families);
