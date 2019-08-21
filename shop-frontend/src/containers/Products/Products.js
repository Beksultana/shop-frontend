import React, {Component} from 'react';
import {Button, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {fetchProducts} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import {fetchCategories} from "../../store/actions/categoriesActions";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts(this.props.match.params.id);
    this.props.fetchCategories()
  }

  componentDidUpdate(prevProps){
      const path = this.props.match.params.id;
      if (prevProps.match.params.id !== path){
          this.props.fetchProducts(path)
      }
  };

  render() {
    return (
      <Row>
          <Col sm={3}>
              <ListGroup>
                  <ListGroupItem tag={NavLink} to="/" exact>All categories</ListGroupItem>
                  {this.props.categories.map(category => {
                      return (
                          <ListGroupItem
                              key={category._id}
                              tag={NavLink}
                              to={'/category/' + category._id}
                          >
                              {category.title}
                          </ListGroupItem>
                      )
                  })}
              </ListGroup>
          </Col>
          <Col sm={9}>
              <h2>
                  Products
                  {this.props.user && this.props.user.role === "admin" &&
                  <Link to="/products/new">
                      <Button
                          color="primary"
                          className="float-right"
                      >
                          Add product
                      </Button>
                  </Link>
                  }
              </h2>
              {this.props.products.map(product => (
                  <ProductListItem
                      key={product._id}
                      _id={product._id}
                      title={product.title}
                      price={product.price}
                      image={product.image}
                  />
              ))}
          </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
    user: state.users.user,
    categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: categoryId => dispatch(fetchProducts(categoryId)),
    fetchCategories: () => dispatch(fetchCategories())

});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
