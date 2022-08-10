import { createSlice } from '@reduxjs/toolkit';
import { points } from './pointsSlice';

const initialState = {
  1: {
    id: '1',
    name: 'Заявка №1',
    loadingPointId: 1,
    unloadingPointId: 6,
    isSelected: false,
  },
  2: {
    id: '2',
    name: 'Заявка №2',
    loadingPointId: 2,
    unloadingPointId: 7,
    isSelected: false,
  },
  3: {
    id: '3',
    name: 'Заявка №3',
    loadingPointId: 3,
    unloadingPointId: 8,
    isSelected: false,
  },
  4: {
    id: '4',
    name: 'Заявка №4',
    loadingPointId: 4,
    unloadingPointId: 9,
    isSelected: false,
  },
  5: {
    id: '5',
    name: 'Заявка №5',
    loadingPointId: 5,
    unloadingPointId: 10,
    isSelected: false,
  },
};

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    changeLoadingPoint: (state, { payload }) => {
      const { id } = payload;
      state[id] = {
        ...state[id],
        ...payload,
      };
    },
    selectRequest: (state, { payload }) => {
      const { id, isSelected } = payload;
      Object.keys(state).forEach(requestId => {
        if (requestId === id) {
          state[requestId].isSelected = isSelected;
        } else {
          state[requestId].isSelected = false;
        }
      })
    },
  },
});

export const { changeLoadingPoint, selectRequest } = requestsSlice.actions;

export const requests = (state) => state.requests;
export const requestsTableData = (state) => Object.keys(state.requests).map(id => {
  const requestData = requests(state)?.[id];
  const pointsData = points(state);
  const loadingPointData = pointsData?.[requestData.loadingPointId];
  const unloadingPointData = pointsData?.[requestData.unloadingPointId];

  return {
    key: id,
    loadingPoint: {
      name: loadingPointData.name,
    },
    unloadingPoint: {
      name: unloadingPointData.name,
    },
    ...requestData,
  };
});

export const selectedRequest = (state) => {
  const allRequests = requests(state);
  const selectedId = Object.keys(allRequests).find(id => !!allRequests[id].isSelected);
  return allRequests[selectedId];
}

export default requestsSlice.reducer;
