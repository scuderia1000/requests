import React, { useEffect, useMemo } from 'react';
import { Marker, TileLayer, useMap } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { selectedRequest } from '../../store/requestsSlice';
import { points } from '../../store/pointsSlice';
import usePolyline from '../../hooks/usePolyline';

const MapContent = ({ leftWidth }) => {
  const dispatch = useDispatch();
  const map = useMap();
  const pointsData = useSelector(points);

  const selectedRequestData = useSelector(selectedRequest);

  const startPosition = useMemo(() => pointsData[selectedRequestData?.loadingPointId]?.point,
    [pointsData, selectedRequestData?.loadingPointId]);
  const endPosition = useMemo(() => pointsData[selectedRequestData?.unloadingPointId]?.point,
    [pointsData, selectedRequestData?.unloadingPointId]);

  // fit map by markers
  useEffect(() => {
    map.invalidateSize();
  }, [leftWidth, map]);

  // fetch route
  useEffect(() => {
    let markerBounds = latLngBounds([]);

    if (startPosition?.length && endPosition?.length){
      [startPosition, endPosition].forEach(marker => {
        markerBounds.extend([marker[0], marker[1]]);
      })
      map.fitBounds(markerBounds);

      dispatch({ type: 'ROUTE_FETCH_REQUESTED', payload: { startPoints: startPosition, endPoints: endPosition } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPosition, endPosition, map]);

  usePolyline();

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {startPosition && <Marker position={startPosition}/>}
      {endPosition && <Marker position={endPosition}/>}
    </>
  );
};

export default MapContent;
