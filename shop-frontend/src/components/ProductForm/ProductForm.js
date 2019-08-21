import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class ProductForm extends Component {
  state = {
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    });
  };

  render() {
    return (
      <Form onSubmit={this.submitFormHandler}>
        <FormGroup row>
          <Label sm={2} for="category">Category</Label>
          <Col sm={10}>
            <Input
              type="select" required
              name="category" id="category"
              value={this.state.category}
              onChange={this.inputChangeHandler}
            >
              {this.props.categories.map(category => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2} for="title">Title</Label>
          <Col sm={10}>
            <Input
              type="text" required
              name="title" id="title"
              placeholder="Enter product title"
              value={this.state.title}
              onChange={this.inputChangeHandler}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="price">Price</Label>
          <Col sm={10}>
            <Input
              type="number" required min="0"
              name="price" id="price"
              placeholder="Enter product price"
              value={this.state.price}
              onChange={this.inputChangeHandler}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="description">Description</Label>
          <Col sm={10}>
            <Input
              type="textarea" required
              name="description" id="description"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.inputChangeHandler}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2} for="image">Image</Label>
          <Col sm={10}>
            <Input
              type="file"
              name="image" id="image"
              onChange={this.fileChangeHandler}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{offset: 2, size: 10}}>
            <Button type="submit" color="primary">Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default ProductForm;
