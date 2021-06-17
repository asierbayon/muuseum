import http from './base-api-service';
// @types
import { UserLogin, UserRegister, FetchedUser, FetchedFollower, ListedUser } from '../@types/user';
import { SingleAsset } from '../@types/asset';

type GetUserResponseConainer = {
  user: FetchedUser;
  assets: SingleAsset[];
}

type GetUsersResponseContainer = {
  results: number;
  users: ListedUser[];
}

type GetFollowersResponseContainer = FetchedFollower[];

export const register = (user: UserRegister) => http.post('/users', user);
export const login = (user: UserLogin) => http.post('/login', user);
export const logout = () => http.post('/logout');
export const update = (user: object) => http.put('/users', user);

export const user = (user: string) => http.get<FetchedUser, GetUserResponseConainer>(`/${user}`);
export const search = (input: string) => http.get<ListedUser, GetUsersResponseContainer>('/users', { params: { search: input } });

export const follow = (user: string) => http.post(`/${user}/follow`);
export const unfollow = (user: string) => http.delete(`/${user}/follow`);
export const following = (user: string) => http.get<FetchedFollower, GetFollowersResponseContainer>(`/${user}/following`);
export const followers = (user: string) => http.get<FetchedFollower, GetFollowersResponseContainer>(`/${user}/followers`);

const service = {
  register,
  login,
  logout,
  update,
  user,
  search,
  follow,
  unfollow,
  following,
  followers
};

export default service;
