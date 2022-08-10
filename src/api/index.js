const fetchRoute = ({
    startPoints,
    endPoints,
  }) => fetch(`https://router.project-osrm.org/route/v1/driving/${[startPoints, endPoints].join(';')}?overview=full&geometries=geojson`);

export default fetchRoute;
