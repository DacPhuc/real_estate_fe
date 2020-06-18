/**
 * request
 * api: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const errorHandler = error => {
  console.log('line 9 - error', error);
  const { response = {} } = error;
  const { status } = response;

  if (status === 401) {
    notification.error({
      message: 'Error 400',
    });
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  // environment should not be used
  if (status === 403) {
    notification.error({
      message: 'Error 403',
    });
    return;
  }
  if (status <= 504 && status >= 500) {
    notification.error({
      message: 'Error 500',
    });
    return;
  }
  if (status >= 404 && status < 422) {
    notification.error({
      message: `Error ${status}`,
    });
  }
};

const request = extend({
  errorHandler,
  credentials: 'include',
});

request.interceptors.request.use(async (url, options) => {
  let token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  let Authorization;

  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  return {
    url: url,
    options: { ...options, headers: headers },
  };
});

export default request;
