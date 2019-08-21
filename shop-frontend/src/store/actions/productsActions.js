import axios from '../../axios-api';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';

export const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});

export const fetchProducts = (categoryId) => {
  return dispatch => {

      let path = '/products';

      if (categoryId) {
          path += '?category=' + categoryId;
      }

    return axios.get(path).then(
      response => dispatch(fetchProductsSuccess(response.data))
    );
  };
};

export const createProduct = productData => {
  return dispatch => {
    return axios.post('/products', productData).then(
      () => dispatch(createProductSuccess())
    );
  };
};
