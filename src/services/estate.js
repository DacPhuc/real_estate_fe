import request from '@/utils/request';
import { stringify } from 'qs';
import { func } from 'prop-types';

export async function query(payload) {
  return request(`/api/estates?${stringify(payload)}`);
}

export async function getGeolocation(payload) {
  return request(`/api/estates/geolocation?id=${payload}`);
}

export async function changeLight(payload) {
  return request('/api/estates/light', { method: 'POST', data: payload });
}

export async function visualize() {
  return request('/api/estates/visualize');
}

export async function priceVisual(payload) {
  return request('/api/estates/priceVisual', { method: 'POST', data: payload });
}
