import request from '@/utils/request';
import { method } from 'lodash';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function login(payload) {
  return request('/api/users/login', { method: 'POST', data: payload });
}

export async function accountSignUp(payload) {
  return request('/api/users/sign-up', { method: 'POST', data: payload });
}

export async function checkAuthentication() {
  return request('/api/users/check');
}
