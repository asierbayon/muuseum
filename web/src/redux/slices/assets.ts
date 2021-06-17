import { createSlice } from '@reduxjs/toolkit';
import { SingleAsset } from '../../@types/asset';
import { feed } from '../../services/assets-service';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

type AssetsState = {
  isLoading: boolean;
  error: boolean;
  feed: SingleAsset[];
};

const initialState: AssetsState = {
  isLoading: false,
  error: false,
  feed: [],
};

const slice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET FEED
    getFeedSuccess(state, action) {
      state.isLoading = false;
      state.feed = action.payload;
    },

  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getFeed() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await feed();
      dispatch(slice.actions.getFeedSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}