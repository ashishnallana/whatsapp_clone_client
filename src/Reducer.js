export const initialState = {
  uid: null,
  chatId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_UID":
      return {
        ...state,
        uid: action.item,
      };

    case "UPDATE_CHAT":
      return {
        ...state,
        chatId: action.item,
      };

    default:
      return state;
  }
};

export default reducer;
