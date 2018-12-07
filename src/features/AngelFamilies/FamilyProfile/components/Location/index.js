import Map from 'Components/Map';
import React from 'react';
import styled from 'styled-components';

import homeIcon from 'Assets/icons/icn-feature-house.svg';

const Location = ({ lat, lon, city, address }) => {
  return (
    <Container>
      <AddressRow>
        <HomeIcon src={homeIcon} />
        <Address>
          <Street>{address}</Street>
          <Place>{city}</Place>
        </Address>
      </AddressRow>
      <Map
        lat={lat}
        lon={lon}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_MAPS_ID
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div style={{ height: `10.3125rem`, width: '100%' }} />
        }
        mapElement={
          <div style={{ height: `100%`, borderRadius: 4, width: '100%' }} />
        }
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Address = styled.div`
  flex: 1;
  margin-left: 0.5rem;
`;
const Street = styled.div`
  font-size: 0.9375rem;
`;
const Place = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
`;

const HomeIcon = styled.img``;

const MapImg = styled.img`
  width: 100%;
  max-width: 100%;
  align-self: center;
`;

export default Location;
