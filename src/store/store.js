import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import requestsReducer from './requestsSlice';
import pointsReducer from './pointsSlice';
import saga from './saga/sagas';

let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
    points: pointsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);
