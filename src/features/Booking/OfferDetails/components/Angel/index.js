import { Grid, Divider } from 'semantic-ui-react';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import CustomDivider from 'Components/Divider';
import React from 'react';

import AngelSection from '../AngelSection';
import ButtonsSection from '../ButtonsSection';
import Days from '../Days';
import ExpirationTime from '../ExpirationTime';
import { isMobile } from 'react-device-detect';

const Angel = ({
  angelId,
  phone,
  history,
  name,
  age,
  divider,
  notFullyAccepted,
  expired,
  awaiting,
  declined,
  img,
  maxDays,
  selectedDays,
  expiresAt,
  onOfferLook,
  onDeclineOffer,
  onOfferAccept,
}) => {
  return (
    <div>
      <Grid container>
        <CustomRow padding="1rem 0 0 0">
          <CustomColumn noPadding>
            <AngelSection
              declined={declined}
              name={name}
              age={age}
              img={img}
              angelId={angelId}
              phone={phone}
              history={history}
            />
          </CustomColumn>
        </CustomRow>
        <CustomRow verticalAlign="middle" noPadding>
          <CustomColumn noPadding width={5}>
            <Days
              awaiting={awaiting}
              declined={declined}
              max={maxDays}
              selected={selectedDays}
            />
          </CustomColumn>
          <CustomColumn noPadding width={11}>
            <ExpirationTime
              awaiting={awaiting}
              declined={declined}
              expired={expired}
              expiresAt={expiresAt}
            />
          </CustomColumn>
        </CustomRow>
        {declined || awaiting ? (
          <CustomRow />
        ) : (
          <CustomRow>
            <ButtonsSection
              onOfferLook={onOfferLook}
              expired={expired}
              notFullyAccepted={notFullyAccepted}
              onDecline={onDeclineOffer}
              onAccept={onOfferAccept}
            />
          </CustomRow>
        )}
      </Grid>
      {divider && !isMobile ? <Divider /> : null}
      {divider && isMobile ? <CustomDivider /> : null}
    </div>
  );
};

export default Angel;
