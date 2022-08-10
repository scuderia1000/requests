import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { route } from '../store/pointsSlice';
import { useMap } from 'react-leaflet';

const usePolyline = () => {
  const map = useMap();
  const routeData = useSelector(route);
  const [polyline, setPolyline] = useState(undefined);

  // add route polyline
  useEffect(() => {
    if (routeData.length) {
      const polylineByRoute = L.polyline(routeData, {color: 'red'}).addTo(map);
      map.fitBounds(polylineByRoute.getBounds());

      setPolyline(polylineByRoute);
    }
  }, [map, routeData]);

  // remove polyline
  useEffect(() => {
    const isPolylineNeedClear = !!(!routeData.length && polyline);
    if (isPolylineNeedClear) {
      polyline.removeFrom(map);
      setPolyline(undefined);
    }
  }, [polyline, routeData, map]);
}

export default usePolyline;
