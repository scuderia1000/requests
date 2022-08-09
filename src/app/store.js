import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import requestsReducer from '../store/requestsSlice';
import pointsReducer from '../store/pointsSlice';
import loadingPointsReducer from '../store/loadingPointsSlice';
import unloadingPointsReducer from '../store/unloadingPointsSlice';

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
    points: pointsReducer,
    // loadingPoints: loadingPointsReducer,
    // unloadingPoints: unloadingPointsReducer,
  },
});
