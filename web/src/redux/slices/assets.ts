// redux
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// @types
import { ListedUser } from '../../@types/user';
import { SingleAsset, FetchedAssetInfo } from '../../@types/asset';
// services
import { asset, feed } from '../../services/assets-service';

// ----------------------------------------------------------------------

type AssetsState = {
  isLoading: boolean;
  error: boolean;
  feed: SingleAsset[];
  asset: FetchedAssetInfo | null;
  owner: ListedUser | null;
};

const initialState: AssetsState = {
  isLoading: false,
  error: false,
  feed: [],
  asset: null,
  owner: null
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

    // GET ASSET
    getAssetSuccess(state, action) {
      state.isLoading = false;
      state.asset = action.payload;
    },

    // GET OWNER
    getOwnerSuccess(state, action) {
      state.isLoading = false;
      state.owner = action.payload;
    }

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

// ----------------------------------------------------------------------

export function getAsset(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await asset(id);
      dispatch(slice.actions.getAssetSuccess(response.asset));
      dispatch(slice.actions.getOwnerSuccess(response.user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}