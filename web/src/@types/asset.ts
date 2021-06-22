import { FetchedUser, ListedUser } from './user';

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

export type FetchedAssetInfo = {
  title: string;
  image: string;
  assetContractAddress: string;
  tokenId: string;
  url: string;
  owner: string;
  likes: number;
  comments: number;
  id: string;
  likedByMe: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type FetchedAsset = {
  asset: FetchedAssetInfo;
  user: ListedUser;
}