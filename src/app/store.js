import { configureStore } from '@reduxjs/toolkit';
import requestsReducer from '../store/requestsSlice';
import pointsReducer from '../store/pointsSlice';

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
    points: pointsReducer,
  },
});
