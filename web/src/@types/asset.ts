import { FetchedUser } from './user';

export type SingleAsset = {
  image: string;
  title: string;
  owner: FetchedUser;
  likes: number;
  likedByMe: boolean;
  id: string;
  url: string;
}

export type SimpleSingleAsset = {
  image: string;
  id: string;
}