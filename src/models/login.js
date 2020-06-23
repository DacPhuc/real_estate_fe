import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { notification } from 'antd';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { login as accountLogin, accountSignUp } from '@/services/user';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      console.log(response);
      if (response) {
        localStorage.setItem('token', response);
        put({
          type: 'changeLoginStatus',
        });
        reloadAuthorized();
        yield put(routerRedux.replace('/'));
        notification.success({
          message: 'Login successfully',
        });
      }
    },

    *signUp({ payload }, { call, put }) {
      const response = yield call(accountSignUp, payload);
      console.log(response);
      if (response) {
        notification.success({
          message: 'Sign up successfully',
        });
      } else {
        notification.error({
          message: 'Username and email must be unique',
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('user');
      return {
        ...state,
        status: true,
      };
    },
  },
};
