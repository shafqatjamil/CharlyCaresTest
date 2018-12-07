import { injectIntl, FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import DateTime from 'react-datetime';
import DesktopInput from 'Components/DesktopInput';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { Select } from 'semantic-ui-react';

import infoIcon from 'Assets/icons/btn-info.svg';
import videoIcon from 'Assets/icons/camera.svg';

import EditButton from '../../../../components/EditButton';

class DataSection extends React.PureComponent {
  educationValues = ['MBO', 'HBO', 'WO', 'Other'];

  state = {
    isBioDisabled: true,
    isPlayingVideo: false,
  };

  descRef = React.createRef();
  exampleVideo = React.createRef();

  componentWillUnmount() {
    this.exampleVideo.current.removeEventListener(
      'webkitfullscreenchange',
      this.onFullScreenChange
    );
    this.exampleVideo.current.removeEventListener(
      'onmozfullscreenchange',
      this.onFullScreenChange
    );
  }

  onEditBio = () => {
    this.setState(
      prevState => {
        return {
          isBioDisabled: false,
        };
      },
      () => {
        this.descRef.current.focus();
      }
    );
  };

  onFocusOut = () => {
    this.setState(prevState => ({
      isBioDisabled: true,
    }));
  };

  addFullScreenListener = () => {
    if (this.exampleVideo.current.webkitRequestFullscreen) {
      this.exampleVideo.current.addEventListener(
        'webkitfullscreenchange',
        this.onFullScreenChange
      );
    }
    if (this.exampleVideo.current.mozRequestFullScreen) {
      this.exampleVideo.current.addEventListener(
        'onmozfullscreenchange',
        this.onFullScreenChange
      );
    }
  };

  onFullScreenChange = () => {
    if (!document.webkitFullscreenElement) {
      this.exampleVideo.current.pause();
      this.exampleVideo.current.webkitExitFullscreen();
      this.setState({
        isPlayingVideo: false,
      });
    }
  };

  onVideoPlay = () => {
    if (this.exampleVideo.current.webkitRequestFullscreen) {
      this.setState(
        {
          isPlayingVideo: true,
        },
        () => {
          this.addFullScreenListener();
          if (!this.exampleVideo.current.src) {
            this.exampleVideo.current.src =
              'https://s3.eu-central-1.amazonaws.com/charlycares-videos/Mijn+film.mp4';
          }
          this.exampleVideo.current.webkitRequestFullscreen();
          this.exampleVideo.current.play();
        }
      );
    } else if (this.exampleVideo.current.mozRequestFullScreen) {
      this.setState(
        {
          isPlayingVideo: true,
        },
        () => {
          this.addFullScreenListener();
          if (!this.exampleVideo.current.src) {
            this.exampleVideo.current.src =
              'https://s3.eu-central-1.amazonaws.com/charlycares-videos/Mijn+film.mp4';
          }
          this.exampleVideo.current.mozRequestFullScreen();
          this.exampleVideo.current.play();
        }
      );
    }
  };

  onVideoEnd = () => {
    if (this.exampleVideo.current.webkitRequestFullscreen) {
      this.exampleVideo.current.webkitExitFullscreen();
    }
    if (this.exampleVideo.current.mozRequestFullScreen) {
      this.exampleVideo.current.mozCancelFullScreen();
    }
    this.setState({
      isPlayingVideo: false,
    });
  };

  render() {
    const { image } = this.props.profile;
    return (
      <Container>
        <ExampleVideo
          onEnded={this.onVideoEnd}
          active={this.state.isPlayingVideo}
          innerRef={this.exampleVideo}
        />
        <PhotoContainer>
          <ProfileImage src={image} />
          <PhotoAndVideoWrapper>
            <VideoContainer>
              <VideoIcon src={videoIcon} />
              <VideoText>
                <FormattedMessage id="profile.angel.edit.promoVideo" />
              </VideoText>
              <InfoIcon onClick={this.props.onOverlayOpen} src={infoIcon} />
            </VideoContainer>
            <VideoContainer>
              <UploadBtn>
                <VideoInput
                  type="file"
                  accept="video/mp4, video/quicktime"
                  size="30000000"
                  onChange={this.props.onVideoUpload}
                />
                <FormattedMessage id="profile.angel.edit.upload" />
              </UploadBtn>
              <ExampleVideoBtn onClick={this.onVideoPlay}>
                <FormattedMessage id="profile.angel.edit.exampleVideo" />
              </ExampleVideoBtn>
            </VideoContainer>
          </PhotoAndVideoWrapper>
        </PhotoContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.firstName" />
          </Name>
          <Names
            name="firstName"
            onChange={this.props.onInputChange}
            value={this.props.firstName}
          />
        </NamesContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.surname" />
          </Name>
          <Names
            name="lastName"
            onChange={this.props.onInputChange}
            value={this.props.lastName}
          />
        </NamesContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.dateOfBirth" />
          </Name>
          <Value>
            {/* {moment(this.props.birthdate, 'YYYY-MM-DD').format('MMMM DD, YYYY')} */}
            {/* <DateInput
              type="date"
              value={this.props.birthdate}
              onChange={this.props.onBirthDateChange}
            /> */}
            <DateTime
              dateFormat="MMMM DD, YYYY"
              timeFormat={false}
              closeOnSelect
              onChange={this.props.onBirthDateChange}
              renderInput={props => <DesktopInput {...props} />}
              className="rdt-relative"
              value={this.props.birthdate}
            />
          </Value>
        </NamesContainer>
        {!this.props.isBirthdateValid && (
          <DateError>* Angel must be at least 15 years old</DateError>
        )}
        <DescContainer>
          <DescHeadingContainer>
            <Name>
              <FormattedMessage id="profile.angel.edit.personalDesc" />
            </Name>
            <EditButton onClick={this.onEditBio} />
          </DescHeadingContainer>
          <Desc
            onBlur={this.onFocusOut}
            disabled={this.state.isBioDisabled}
            innerRef={this.descRef}
            onChange={this.props.onBioChange}
            value={this.props.bio}
            placeholder={this.props.intl.formatMessage({
              id: 'profile.angel.edit.personalDescPlaceholder',
            })}
          />
        </DescContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.education" />
          </Name>
          <EducationSelect
            onChange={this.props.onInputChange}
            value={this.props.education}
            options={this.educationValues.map(value => ({
              id: value,
              text: value,
              value,
            }))}
            name="education"
          />
        </NamesContainer>
        <NamesContainer>
          <Name>
            <FormattedMessage id="profile.angel.edit.areaOfInterest" />
          </Name>
          <AreaOfInterestInput
            onChange={this.props.onInputChange}
            value={this.props.fieldOfStudy}
            name="fieldOfStudy"
          />
        </NamesContainer>
      </Container>
    );
  }
}

const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
`;

const Container = styled.div`
  text-align: center;
  width: 100%;
  padding: 1.25rem 1rem 1rem;
`;

const PhotoContainer = styled.div`
  display: flex;
`;

const PhotoAndVideoWrapper = styled.div`
  flex: 1;
`;

const VideoIcon = styled.img`
  width: 1.1875rem;
  height: 0.9475rem;
`;
const InfoIcon = styled.img`
  width: 1.75rem;
  height: 1.75rem;
`;

const VideoText = styled.div`
  font-weight: 600;
  font-family: ${({ theme }) => theme.primaryFont};
  margin: 0 0.625rem;
  font-size: inherit;
  line-height: 1.5;
`;

const ProfileImage = styled.img`
  width: 5.0625rem;
  height: 5.0625rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.defaultBtnBackgroundColor};
  margin-right: 1.25rem;
`;

const NamesContainer = styled.div`
  border-bottom: ${props =>
    isMobile ? `1px solid ${props.theme.defaultGrey}` : 0};
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  align-items: center;
  position: relative;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

const Name = styled.div`
  font-size: 0.9375rem;
  flex: 0.7;
  text-align: left;
`;
const DateError = styled.div`
  font-size: 0.75rem;
  text-align: left;
  color: ${props => props.theme.warning};
`;

const Value = styled.div`
  font-size: 1rem;
  flex: 1;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  text-align: left;
  line-height: 1.375;
  position: relative;
`;
const Names = styled.input`
  font-size: 1rem;
  flex: 1;
  color: ${props => props.theme.secondaryColor};
  font-family: ${props => props.theme.primaryFont};
  text-align: left;
  line-height: 1.375;
  border: 0;
  border-bottom: ${props =>
    !isMobile ? `1px solid ${props.theme.defaultGrey}` : 0};

  &:focus {
    outline: 0;
  }
`;

const AreaOfInterestInput = Names.extend``;

const DateInput = styled.input`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 100;
  opacity: 0;
  border: 0;
  border-bottom: ${props =>
    !isMobile ? `1px solid ${props.theme.defaultGrey}` : 0};

  &:focus {
    outline: 0;
  }
`;

const EducationSelect = styled(Select)`
  &&& {
    border: 0;
    background: transparent;
    color: ${props => props.theme.secondaryColor};
    font-family: ${props => props.theme.primaryFont};
    margin-right: -0.6rem;
    display: flex;
    flex: 0.5;
    margin-top: 0.2rem;
    align-items: center;
    justify-content: flex-end;

    & > .text {
      color: ${props => props.theme.secondaryColor} !important;
    }

    & > .menu {
      border: 0;

      & span {
        color: ${props => props.theme.secondaryColor};
      }
    }
  }
`;

const DescHeadingContainer = styled.div`
  position: relative;
  padding-bottom: 1rem;
`;

const DescContainer = styled.div`
  padding: 1rem 0 0;
`;

const Desc = styled.textarea.attrs({
  rows: 7,
})`
  width: 100%;
  font-size: 0.9375rem;
  line-height: 1.6;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.defaultGrey};
  font-weight: 300;
  padding-bottom: 1rem;

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-weight: 300;
    color: ${props => props.theme.lightGrey};
    font-style: italic;
  }
`;

const UploadBtn = styled.div`
  width: 5.5625rem;
  height: 1.5rem;
  background: ${({ theme }) => theme.primaryColor};
  border-radius: 1.8125rem;
  color: #fff;
  font-size: 0.8125rem;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.38;
  padding: 0;
  margin-right: 1.25rem;
  position: relative;

  &:focus {
    outline: 0;
  }
`;

const VideoInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const ExampleVideoBtn = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 0.75rem;
  line-height: 1.41667;
  display: flex;
  align-items: center;
  padding: 0;

  &:focus {
    outline: 0;
  }
`;

const ExampleVideo = styled.video`
  display: ${props => (props.active ? 'block' : 'none')};

  &:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }
`;

export default injectIntl(DataSection);
