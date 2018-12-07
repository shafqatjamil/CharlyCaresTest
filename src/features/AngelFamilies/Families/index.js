import { AngelTabBar } from 'Components/NavigationTabs';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { ProgressiveFamilies } from 'Components/Progressive';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomLink from 'Components/CustomLink';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';
import EmptyCell from 'Components/EmptyCell';
import Error from 'Components/Error';
import InfiniteScroll from 'react-infinite-scroller';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import ScrollerLoader from 'Components/ScrollerLoader';

import { getFamilies } from '../data/selectors';
import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { getUserId, getActiveSitting } from './selectors';
import { onGetFamilies } from '../data/actions';
import FamilyList from './components/FamilyList';
import FamilySection from './components/FamilySection';
import ListItem from './components/ListItem';

class Families extends Component {
  state = {
    hasMore: true,
    totalNumOfPages: 0,
    jumpBy: 5,
    families: [],
    currentIndex: 0,
  };

  componentDidMount() {
    this.props.onGetFamilies();
  }

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

  onRetry = () => {
    this.props.onGetFamilies();
  };

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
      <Layout
        navBorder
        navLeftComponent={() => (
          <CustomLink to="/edit">
            <FormattedMessage id="navigation.edit" />
          </CustomLink>
        )}
        navTitle={<FormattedMessage id="families.navTitle" />}
      >
        <ContentWrapper>
          <Error errors={this.props.errors} onRetry={this.onRetry} />
          <CustomRow noPadding>
            <CustomColumn noPadding>
              {this.props.activeSitting &&
              typeof this.props.activeSitting === 'object' &&
              !this.props.activeSitting instanceof Array ? (
                <FamilySection activeSitting={this.props.activeSitting} />
              ) : null}
              <Divider right>
                <FormattedMessage id="families.sortingText" />
              </Divider>
              <Grid container>
                <ProgressiveFamilies isLoading={this.props.isLoading} />
                {!this.props.isLoading && this.props.families.length > 0 ? (
                  <CustomRow>
                    <FamilyList>
                      <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMore}
                        loader={<ScrollerLoader key={9999} />}
                      >
                        {this.state.families.map(fam => {
                          return (
                            <ListItem
                              angelId={fam.user_id}
                              key={fam.id}
                              family={fam}
                            />
                          );
                        })}
                      </InfiniteScroll>
                    </FamilyList>
                  </CustomRow>
                ) : null}
              </Grid>
            </CustomColumn>
          </CustomRow>
          <EmptyCell padding="3rem 0" />
        </ContentWrapper>
        <AngelTabBar />
      </Layout>
    );
  }

  static defaultProps = {
    families: [],
    activeSitting: {},
  };
}

export default connect(
  state => ({
    isLoading: getLoadingStatus(state),
    errors: getErrors(state),
    families: getFamilies(state),
    userId: getUserId(state),
    activeSitting: getActiveSitting(state),
  }),
  {
    onGetFamilies,
  }
)(Families);
