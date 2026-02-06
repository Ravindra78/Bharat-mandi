const initialState = {
  listings: [],
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_LISTING_SUCCESS':
      return { ...state, listings: [action.payload, ...state.listings], error: null };
    case 'CREATE_LISTING_FAIL':
      return { ...state, error: action.payload };

    case 'GET_LISTINGS_SUCCESS':
    case 'SEARCH_LISTINGS_SUCCESS':
      return { ...state, listings: action.payload, error: null };

    case 'GET_LISTINGS_FAIL':
    case 'SEARCH_LISTINGS_FAIL':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
