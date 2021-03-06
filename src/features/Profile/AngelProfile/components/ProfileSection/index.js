import React from 'react';
import styled from 'styled-components';
import CustomLink from 'Components/CustomLink';
import { FormattedMessage } from 'react-intl';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';

import ProgressBar from '../ProgressBar';

const cutBio = string => {
  if (!string) return;
  return string.slice(0, 96) + '...';
};

const ProfileSection = ({ image, fullName, bio, onEdit }) => {
  return (
    <Container>
      <Header>{fullName}</Header>
      <AngelContainer>
        {image ? (
          <AngelImage src={image} />
        ) : (
          <ImagePlaceholder>
            <FormattedMessage id="profile.angel.home.imagePlaceHolder" />
          </ImagePlaceholder>
        )}

        <AngelDescContainer>
          {bio ? (
            <AngelDesc>{cutBio(bio)}</AngelDesc>
          ) : (
            <AngelDesc>
              <FormattedMessage id="profile.angel.home.noDesc" />
            </AngelDesc>
          )}

          <div>
            <CustomLink fontSize="0.8125rem" to="/profile/edit">
              <FormattedMessage id="profile.angel.home.editProfile" />
            </CustomLink>
          </div>
          <ProgressBar percent={65} />
        </AngelDescContainer>
        <Button onClick={onEdit}>
          <Icon src={arrowRight} />
        </Button>
      </AngelContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  position: relative;
`;

const AngelImage = styled.img`
  width: 5.125rem;
  height: 5.125rem;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.defaultGrey};
  margin-right: 0.875rem;
`;

const Header = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

const AngelContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  padding-bottom: 1.125rem;
`;

const ImagePlaceholder = styled.div`
  width: 82px;
  height: 82px;
  padding: 1rem 0.3rem;
  border-radius: 50%;
  color: ${props => props.theme.secondaryColor};
  background: #f9f8f9;
  border: 1px solid ${props => props.theme.defaultGrey};
  font-size: 0.8125rem;
  text-align: center;
  line-height: 1.31;
  margin-right: 0.875rem;
`;

const AngelDescContainer = styled.div`
  padding-top: 0.5rem;
  max-width: 13.0625rem;
`;

const AngelDesc = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.25;
`;

const Button = styled.button`
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;

  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img`
  margin-right: -1rem;
`;

export default ProfileSection;
