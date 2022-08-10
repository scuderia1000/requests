import React from 'react';
import { MapContainer } from 'react-leaflet';
import './styles.css';

export const position = [58.000000, 56.316666];

const Map = ({ content }) => (
  <MapContainer className="map" center={position} zoom={5} scrollWheelZoom={false}>
    {content}
  </MapContainer>
);

export default Map;
