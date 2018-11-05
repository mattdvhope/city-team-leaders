import React, { Component } from 'react';
import { navigate, Link } from 'gatsby';

export default class CarouselMdb extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      window: undefined
    };
  }

  componentDidMount() {
    this.setState({ window: window });
    try {
      const mdbreact = require("mdbreact");
      this.setState({ mdbreact: mdbreact });
    } catch (e) {
      console.error(e);
    }
  }

  render(){
    if (this.state.window) {

      const { Container, Row, Col, Input, Button } = this.state.mdbreact;

      return(
        <Container>
          <Row>
            <Col md="6">
              <form
                method="post"
                onSubmit={event => {
                  this.handleSubmit(event)
                  navigate(`/app/profile`)
                }}
              >
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <Input
                    onChange={this.handleUpdate}
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    name="username"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <Input
                    onChange={this.handleUpdate}
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    name="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <Button>Login</Button>
                </div>
              </form>
            </Col>
          </Row>

          <h1><Link to="/">Return to Home Page</Link></h1>
        </Container>
      );
    } else {
      return <span />
    }
  }
}