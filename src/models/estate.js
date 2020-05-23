import { query, getGeolocation } from '../services/estate';

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
      const response = yield call(getGeolocation, payload.id);
      yield put({
        type: 'saveLocation',
        payload: response.results[0],
      });
    },

    *setCurrentEstate({ payload }, { call, put }) {
      yield put({
        type: 'saveEstate',
        payload: payload,
      });
    },

    *closeMapView({ payload }, { call, put }) {},
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
      return {
        ...state,
        geoLocation: action.payload,
        popUpShowMap: true,
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
  },
};
