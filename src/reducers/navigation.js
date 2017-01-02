const initialSearchState = {
  // searching
  title: "Sign Up",
  page: "SignUp",

};

const auth = (state = initialSearchState, action) => {
  switch (action.type) {
    case "changePage":
    console.log('action', action);
      return {...state, title: action.title, page: action.page}
    default:
      return state;
  }
};

export default auth;
