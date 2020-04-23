
const initialState = {
  inputHeight: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_INPUT:
      return { ...state, ...payload };

    default:
      return state;
  }
};
