const initialState = {
  // searching
  loading: false,
  loggedIn: false,
  user: {},

};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.user, loggedIn: true };
    default:
      return state;
  }
};

export default auth;
