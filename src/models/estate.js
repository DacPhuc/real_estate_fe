import {
  query,
  getGeolocation,
  changeLight,
  postComment,
  getCommentList,
} from '../services/estate';

export default {
  namespace: 'estate',

  state: {
    list: [],
    totalElement: 0,
    numberOfElements: 10,
    popUpShowMap: false,
    popUpShowDetail: false,
    geoLocation: {},
    currentEstate: {},
    currentId: 0,
    currentCoordinate: {
      lat: 10.77653,
      lng: 106.700981,
    },
    listComment: [],
  },

  // Effect use when call request outside
  effects: {
    *getEstate({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    },

    *getGeolocation({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(getGeolocation, id);

      yield put({
        type: 'saveLocation',
        payload: { result: response.results[0], id },
      });
    },

    *setCurrentEstate({ payload }, { call, put }) {
      yield put({
        type: 'saveEstate',
        payload: payload,
      });
    },

    *changeLightStatus({ payload }, { call, put }) {
      let lightStatus = [];
      switch (payload) {
        case 1:
          lightStatus = [{ device_id: 'Light_D', values: ['1', '100'] }];
          break;
        case 2:
          lightStatus = [{ device_id: 'Light_D', values: ['0', '0'] }];
          break;
        default:
          lightStatus = [{ device_id: 'Light_D', values: ['1', '100'] }];
          break;
      }
      const response = yield call(changeLight, lightStatus);
    },

    *postComment({ payload }, { call, put }) {
      const response = yield call(postComment, payload);
      yield put({
        type: 'appendComment',
        payload: response,
      });
    },

    *getListComment({ payload }, { call, put }) {
      const response = yield call(getCommentList, payload);
      yield put({
        type: 'saveCommentList',
        payload: response,
      });
    },
  },

  // Reducer use to update props
  reducers: {
    save(state, action) {
      const response = action.payload;
      return {
        ...state,
        list: response.content,
        totalElement: response.totalElements,
        numberOfElements: response.size,
      };
    },
    saveLocation(state, action) {
      const { payload } = action;
      return {
        ...state,
        geoLocation: payload.result,
        popUpShowMap: true,
        currentId: payload.id,
      };
    },
    closeMapView(state, action) {
      return {
        ...state,
        popUpShowMap: false,
      };
    },
    saveEstate(state, action) {
      return {
        ...state,
        currentEstate: action.payload,
        popUpShowDetail: true,
      };
    },
    toggleShowDetail(state) {
      return {
        ...state,
        popUpShowDetail: false,
      };
    },

    setCoordinate(state, action) {
      return {
        ...state,
        currentCoordinate: action.payload,
      };
    },

    saveCommentList(state, action) {
      return {
        ...state,
        listComment: action.payload,
      };
    },

    appendComment(state, action) {
      const comments = state.listComment;
      comments.push(action.payload);
      return {
        ...state,
        listComment: comments,
      };
    },
  },
};
