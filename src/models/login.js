import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { notification } from 'antd';
import router from 'umi/router';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { login as accountLogin, accountSignUp, checkAuthentication } from '@/services/user';

export default {
  namespace: 'login',

  state: {
    status: false,
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

    *checkAuthentication(_, { call, put }) {
      const response = yield call(checkAuthentication);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      const isLogin = action.payload;
      return {
        ...state,
        status: isLogin ? true : false,
      };
    },
  },
};
