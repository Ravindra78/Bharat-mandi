import {
  createListingService,
  getAllListingsService,
  searchListingsService,
} from '../../services/productService';

export const createListing = (formData) => async (dispatch) => {
  try {
    const listing = await createListingService(formData);
    dispatch({ type: 'CREATE_LISTING_SUCCESS', payload: listing });
  } catch (err) {
    dispatch({ type: 'CREATE_LISTING_FAIL', payload: err.message });
  }
};

export const getAllListings = () => async (dispatch) => {
  try {
    const listings = await getAllListingsService();
    dispatch({ type: 'GET_LISTINGS_SUCCESS', payload: listings });
  } catch (err) {
    dispatch({ type: 'GET_LISTINGS_FAIL', payload: err.message });
  }
};

export const searchListings = (query) => async (dispatch) => {
  try {
    const listings = await searchListingsService(query);
    dispatch({ type: 'SEARCH_LISTINGS_SUCCESS', payload: listings });
  } catch (err) {
    dispatch({ type: 'SEARCH_LISTINGS_FAIL', payload: err.message });
  }
};
