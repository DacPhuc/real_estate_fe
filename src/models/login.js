import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { login as accountLogin } from '@/services/user';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response && response.result,
      // });
      // Login successfully
      if (response) {
        localStorage.setItem('token', response);
        reloadAuthorized();
        yield put(routerRedux.replace('/'));
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('user');
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
