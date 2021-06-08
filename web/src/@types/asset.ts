import { fetchedUser } from './user';

export type SingleAsset = {
  image: string;
  title: string;
  owner: fetchedUser;
  likes: number;
  likedByMe: boolean;
  id: string;
  url: string;
}