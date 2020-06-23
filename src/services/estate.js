import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(payload) {
  return request(`/api/estates?${stringify(payload)}`);
}

export async function getGeolocation(payload) {
  return request(`/api/estates/geolocation?id=${payload}`);
}

export async function changeLight(payload) {
  return request('/api/estates/light', { method: 'POST', data: payload });
}

export async function postComment(payload) {
  return request('/api/estate/comment', { method: 'POST', data: payload });
}

export async function getCommentList(payload) {
  return request(`api/estate/comment?estate_id=${payload}`);
}
