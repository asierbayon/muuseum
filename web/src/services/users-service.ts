import http from './base-api-service';
import { UserLogin, UserRegister } from '../@types/user';

export const register = (user: UserRegister) => http.post('/users', user);
export const login = (user: UserLogin) => http.post('/login', user);
export const logout = () => http.post('/logout');
export const update = (user: object) => http.put('/users', user);

export const user = (user: object) => http.get(`/${user}`);
export const search = (input: string) => http.get('/users', { params: { search: input } });

export const follow = (user: string) => http.post(`/${user}/follow`);
export const unfollow = (user: string) => http.delete(`/${user}/follow`);
export const following = (user: string) => http.get(`/${user}/following`);
export const followers = (user: string) => http.get(`/${user}/followers`);

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
