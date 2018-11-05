import React, { Component } from 'react';

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
              <form>
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                  <Input label="Type your password" icon="lock" group type="password" validate/>
                </div>
                <div className="text-center">
                  <Button>Login</Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <span />
    }
  }
}