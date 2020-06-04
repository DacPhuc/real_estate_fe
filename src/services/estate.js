import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(payload) {
  return request(`/api/estates?${stringify(payload)}`);
}

export async function getGeolocation(payload) {
  return request(`/api/estates/geolocation?id=${payload}`);
}

export async function changeLightStatus(payload) {
  return request(`/api/estates/light?status=${light}`);
}
