import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// services
import {
  followers as fetchFollowers,
  following as fetchFollowing,
  follow,
  unfollow,
  user as fetchUser,
  search
} from '../../services/users-service';
// @types
import { FetchedFollower, FetchedUser, ListedUser } from '../../@types/user';
import { SingleAsset } from '../../@types/asset';

type UserState = {
  isLoading: boolean;
  error: boolean;
  user: FetchedUser | null;
  assets: SingleAsset[];
  followers: FetchedFollower[];
  following: FetchedFollower[];
  userList: ListedUser[];
};

const initialState: UserState = {
  isLoading: false,
  error: false,
  user: null,
  assets: [],
  followers: [],
  following: [],
  userList: []
};

const slice = createSlice({
  name: 'user',
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

    // GET USER
    getUser(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },

    // GET ASSETS
    getAssets(state, action) {
      state.isLoading = false;
      state.assets = action.payload;
    },

    // GET FOLLOWERS
    getFollowers(state, action) {
      state.isLoading = false;
      state.followers = action.payload;
    },

    // GET FOLLOWING
    getFollowing(state, action) {
      state.isLoading = false;
      state.following = action.payload;
    },

    // SEARCH USERS
    searchUsers(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    }

  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUser(username: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fetchUser(username);
      dispatch(slice.actions.getUser(response.user));
      dispatch(slice.actions.getAssets(response.assets));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFollowers(username: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fetchFollowers(username);
      dispatch(slice.actions.getFollowers(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFollowing(username: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fetchFollowing(username);
      dispatch(slice.actions.getFollowing(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function onToggleFollow(user: FetchedFollower) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      if (user.amIFollowing) await unfollow(user.user.username);
      else await follow(user.user.username);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function searchUsers(value: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await search(value);
      dispatch(slice.actions.searchUsers(response.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}