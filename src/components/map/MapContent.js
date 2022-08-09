import React, { useEffect } from 'react';
import { Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { position } from './Map';

const MapContent = ({ leftWidth }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [leftWidth, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br/> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
};

export default MapContent;
