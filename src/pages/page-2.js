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

      const { Container, Carousel, CarouselInner, CarouselItem, View } = this.state.mdbreact;

      return(
        <Container>

          <h1>Here is a Carousel</h1>

          <Carousel
            activeItem={1}
            length={4}
            showControls={true}
            showIndicators={false}
            className="z-depth-1">
            <CarouselInner>
              <CarouselItem itemId="1">
                <View>
                  <img style={{maxWidth: `100%`}} src="https://s3-ap-southeast-1.amazonaws.com/cityfront/volunteer-teachers1.jpg" alt=""/>
                </View>
              </CarouselItem>
              <CarouselItem itemId="2">
                <View>
                  <img style={{maxWidth: `100%`}} src="https://s3-ap-southeast-1.amazonaws.com/cityfront/volunteer-teachers2.jpg" alt=""/>
                </View>
              </CarouselItem>
              <CarouselItem itemId="3">
                <View>
                  <img style={{maxWidth: `100%`}} src="https://s3-ap-southeast-1.amazonaws.com/cityfront/volunteer-teachers3.jpg" alt=""/>
                </View>
              </CarouselItem>
              <CarouselItem itemId="4">
                <View>
                  <img style={{maxWidth: `100%`}} src="https://s3-ap-southeast-1.amazonaws.com/cityfront/volunteer-teachers4.jpg" alt=""/>
                </View>
              </CarouselItem>
            </CarouselInner>
          </Carousel>
        </Container>
      );
    } else {
      return <span />
    }
  }
}