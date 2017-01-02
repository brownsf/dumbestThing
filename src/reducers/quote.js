const initialSearchState = {
  // searching
  quotes: [],

};

const quote = (state = initialSearchState, action) => {
  switch (action.type) {
    case "addQuote":
      console.log('action', state.quotes);
      return { ...state, quotes: state.quotes.concat(action.quote) };
    default:
      return state;
  }
};

export default quote;
