import http from './base-api-service';
// @types
import { SingleAsset } from '../@types/asset';

type ResponseContainer = SingleAsset[];

export const feed = () => http.get<SingleAsset, ResponseContainer>('/feed');

export const asset = (id: string) => http.get(`/assets/${id}`)

export const like = (id: string) => http.post(`/assets/${id}/likes`);

export const unlike = (id: string) => http.delete(`/assets/${id}/likes`);

export const upload = (asset: object) => http.post('/assets', asset)

const service = {
  feed,
  asset,
  like,
  unlike,
  upload
}

export default service;