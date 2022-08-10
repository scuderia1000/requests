import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchRoute from '../api';

export const pointsInitialState = {
  list: {
    1: {
      id: 1,
      name: 'Добрянка, ул. Энгельса, 53',
      point: [58.467263467194215, 56.41495061872516],
    },
    2: {
      id: 2,
      name: 'Полазна, ул. Парковая, 2',
      point: [58.29664848350845, 56.40694841684252],
    },
    3: {
      id: 3,
      name: 'Березники, ул. Пятилетки, 41',
      point: [59.40622665035573, 56.80609138043801],
    },
    4: {
      id: 4,
      name: 'Соликамск, ул. Энергетиков, 3',
      point: [59.671317837936165, 56.74419661336393],
    },
    5: {
      id: 5,
      name: 'Кунгур, ул. Ленина, 12',
      point: [57.42595581497884, 56.94681721193928],
    },
    6: {
      id: 6,
      name: 'Пермь, ул. Солдатова, 36',
      point: [57.973754137513076, 56.237796527082736],
    },
    7: {
      id: 7,
      name: 'Оса, ул. Гоголя, 32',
      point: [57.28028518608994, 55.44594536229734],
    },
    8: {
      id: 8,
      name: 'Елово, Ленина ул., 41',
      point: [57.05348733182496, 54.91140358112494],
    },
    9: {
      id: 9,
      name: 'Кукуштан, Напольная ул., 21',
      point: [57.64508040954238, 56.48362682951829],
    },
    10: {
      id: 10,
      name: 'Барда, Матросова ул., 21',
      point: [56.921953832704716, 55.58747033338573],
    },
  },
  routeByPoints: '',
};

export const fetchRouteAsync = createAsyncThunk(
  'points/fetchRoute',
  async ({ startPoints, endPoints }) => {
    const response = await fetchRoute({ startPoints, endPoints });
    const result = await response.json();

    return result?.routes?.[0]?.geometry.coordinates;
  }
);

export const pointsSlice = createSlice({
  name: 'points',
  initialState: pointsInitialState,
  reducers: {
    clearRoute: (state) => {
      state.routeByPoints = pointsInitialState.routeByPoints;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchRouteAsync.fulfilled, (state, action) => {
      state.routeByPoints = action.payload;
    })
  },
});

export const { clearRoute } = pointsSlice.actions;

export const points = (state) => state.points.list;
export const route = (state) => state.points.routeByPoints;

export default pointsSlice.reducer;
