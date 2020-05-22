import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(payload) {
  return request(`/api/estates?${stringify(payload)}`);
}
