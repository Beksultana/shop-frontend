import React, {Component, Fragment} from 'react';
import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";

class NewProduct extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  createProduct = productData => {
    this.props.onProductCreated(productData).then(() => {
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <Fragment>
        <h2>New product</h2>
        <ProductForm
          onSubmit={this.createProduct}
          categories={this.props.categories}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
  onProductCreated: productData => dispatch(createProduct(productData)),
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
