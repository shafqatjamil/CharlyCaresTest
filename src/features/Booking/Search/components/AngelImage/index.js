import { Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import styled from 'styled-components';

import API from '../../../api';

import heartActive from 'Assets/icons/btn-heart-active.svg';
import heartInactive from 'Assets/icons/btn-heart-inactive.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 0.5rem;
`;

const CustomImage = styled.img.attrs({
  alt: 'angel',
})`
  width: 5.0625rem;
  height: 5.0625rem;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.defaultGrey};
  position: relative;
  top: -5px;
`;

const ImageWrapper = styled.div``;

const Icon = styled(Image)`
  &&& {
    position: absolute;
    top: -15px;
    left: -15px;
    z-index: -9999;
    cursor: pointer;
  }
`;

const ProfileButton = styled.button`
  font-family: ${({ theme }) => theme.primaryFont};
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 0.8125rem;
  background: transparent;
  border: 0;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

class AngelImage extends Component {
  constructor(props) {
    super(props);

    this.state = { liked: this.props.liked, errors: null };

    this.onClickHeart = this.onClickHeart.bind(this);
  }

  onClickHeart() {
    this.setState(
      {
        liked: !this.state.liked,
      },
      () => {
        this.state.liked ? this.likeAngel() : this.unLikeAngel();
      }
    );
  }

  likeAngel() {
    API.angelLike(this.props.id).catch(err => {
      this.setState(state => ({
        errors: err,
        liked: !state.liked,
      }));
    });
  }

  unLikeAngel() {
    API.angelUnLike(this.props.id).catch(err => {
      this.setState(state => ({
        errors: err,
        liked: !state.liked,
      }));
    });
  }

  goToProfile = id => () => {
    if (isMobile) {
      this.props.history.push(`angel/${this.props.id}`);
    } else {
      this.props.history.push(`/booking/search/angel/${this.props.id}`);
    }
    window.analytics.track('FViewProfile', {
      angelID: this.props.id,
    });
  };

  render() {
    return (
      <Container>
        <Icon
          onClick={this.onClickHeart}
          src={this.state.liked ? heartActive : heartInactive}
        />
        <ImageWrapper>
          <CustomImage alt="Angel" circular src={this.props.image} />
        </ImageWrapper>
        <ProfileButton onClick={this.goToProfile(this.props.id)}>
          <FormattedMessage id="booking.search.angelMoreInfo" />
        </ProfileButton>
      </Container>
    );
  }
}

export default withRouter(AngelImage);
