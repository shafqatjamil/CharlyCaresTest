import React from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';

const Map = ({ lat, lon }) => (
  <GoogleMap
    disableDefaultUI
    defaultZoom={15}
    defaultCenter={{ lat, lng: lon }}
  >
    <Marker position={{ lat, lng: lon }} />
  </GoogleMap>
);

export default withScriptjs(withGoogleMap(Map));
