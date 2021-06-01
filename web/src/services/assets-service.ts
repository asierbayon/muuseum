import http from './base-api-service';

export const feed = () => http.get('/feed');

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