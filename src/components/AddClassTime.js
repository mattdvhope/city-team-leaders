import React from 'react';
import axios from 'axios'
import styled from "styled-components";
import { navigateTo } from "gatsby-link"

var FormTitle = styled.p`
  margin-top: 3%;
  font-size: 180%;
`
var FormSubTitle = styled.p`
  margin-top: -3%;
  font-size: 120%;
`

export default class AddClassTime extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      window: undefined,
      mdbreact: undefined,
      period: '',
      period_thai: '',
      category: null,
      order_no: '',
      completed: false,
      cancelled: false,
      part: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ window: window });
    console.log(this.props);

    try {
      const mdbreact = require("mdbreact");
      this.setState({ mdbreact: mdbreact });
    } catch (e) {
      console.error(e);
    }

  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post(`${process.env.GATSBY_API_URL}/class_times`, {
      period: this.state.period,
      period_thai: this.state.period_thai,
      category: null,
      order_no: this.state.order_no,
      completed: false,
      cancelled: false,
      part: this.state.part
    })
    .then(response => {
      console.log(response.data.message)
      return response.data.message;
    })
    .then(message => {
      if (message === "Successful creation of new class time!!") {
        console.log("SUCCESS!!!");
        // this.props.toggle();
        navigateTo('app/view-class-times');
      } else {
        console.log("STILL ERRORS");
      }
    });
  }

  render() {
    if (this.state.window) {

      const { Container, Row, Col, Input, Button } = this.state.mdbreact;

      return(
        <Container>
          <Row>
            <Col md="12">

              <form onSubmit={this.handleSubmit} className='needs-validation' noValidate>
                <FormTitle className="text-center mb-4">Add a new Class Time</FormTitle>
                <FormSubTitle className="text-center mb-4">(use examples below the 'SUBMIT' button as templates to copy-paste)</FormSubTitle>
                <div className="grey-text">

                  <Input onChange={this.handleChange} label="Period (in English)" icon="asterisk" name="period" group type="text" validate error="wrong" success="right" required/>

                  <Input onChange={this.handleChange} label="Period (in Thai)" icon="plus" name="period_thai" group type="text" validate error="wrong" success="right" required/>
                  
                  <Input onChange={this.handleChange} label="Order Number" icon="align-left" name="order_no" group type="text" validate error="wrong" success="right" required/>

                  <Input onChange={this.handleChange} label="Part Number" icon="adjust" name="part" group type="text" validate error="wrong" success="right" required/>

                  <br/>

                  <Button color="primary" type="submit">Submit</Button>
                </div>
              </form>
            </Col>
          </Row>
          <Row>
            <h4>Example of Period (in English) --> 20,25,26,27 June and 2 July, 6:30-8:00pm, part 1</h4>
            <h4>Example of Period (in Thai) --> 20,25,26,27 มิถุนายน และ 2 กรกฎาคม (5 วัน), 18:30-20:00น., สวนที่สอง</h4>
            <h4>How to choose Order Number --> Choose a number 10 higher than the lates current class-time</h4>
            <h4>For Part Number, just type in 'one' or 'two' (w/o quote marks).</h4>
          </Row>
        </Container>
      );

    } else {
      return <span />
    }

  }
}