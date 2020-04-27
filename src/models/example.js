export default {
  namespace: 'example',

  state: {
    example: {},
  },

  // Effect use when call request outside
  effects: {
    *exampleGetData({ payload }, { call, put }) {},
  },

  // Reducer use to update props
  reducers: {},
};
