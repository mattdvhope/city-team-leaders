import React from 'react';
import axios from 'axios'
import styled from "styled-components";
import { navigateTo } from "gatsby-link"

var FormTitle = styled.p`
  font-size: 180%;
`

var MaleStyler = styled.span`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  cursor: pointer;
  font-size: 180%;
  @media (min-width: 320px) {
    margin-right: 1.2em;
  }
  @media (max-width: 320px) {
    margin-right: 1em;
  }
`

var FemaleStyler = styled.span`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  cursor: pointer;
  font-size: 180%;
`

export default class AddLeader extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      window: undefined,
      mdbreact: undefined,
      guest: false,
      first_name: '',
      last_name: '',
      gender: '',
      phone_number: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
    this.dealWithMaleClick = this.dealWithMaleClick.bind(this);
    this.dealWithFemaleClick = this.dealWithFemaleClick.bind(this);
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

  dealWithMaleClick() {
    this.setState({ gender: 'ผู้ชาย' });
    MaleStyler = styled.span`
      font-family: "Neue Frutiger W31 Modern Light", "Athiti";
      cursor: pointer;
      font-size: 220%;
      @media (min-width: 320px) {
        margin-right: 1.2em;
      }
      @media (max-width: 320px) {
        margin-right: 1em;
      }
      color: #2D3179
    `
    FemaleStyler = styled.span`
      font-family: "Neue Frutiger W31 Modern Light", "Athiti";
      cursor: pointer;
      font-size: 140%;
      text-decoration: line-through;
    `
  }

  dealWithFemaleClick() {
    this.setState({ gender: 'ผู้หญิง' });
    MaleStyler = styled.span`
      font-family: "Neue Frutiger W31 Modern Light", "Athiti";
      cursor: pointer;
      font-size: 140%;
      @media (min-width: 320px) {
        margin-right: 1.2em;
      }
      @media (max-width: 320px) {
        margin-right: 1em;
      }
      text-decoration: line-through;
    `
    FemaleStyler = styled.span`
      font-family: "Neue Frutiger W31 Modern Light", "Athiti";
      cursor: pointer;
      font-size: 220%;
      color: #2D3179
    `
  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post(`${process.env.GATSBY_API_URL}/leaders`, {
      guest: false,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender,
      phone_number: this.state.phone_number,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      role: "leader"
    })
    .then(response => {
      console.log(response.data.message)
      let firstname = document.getElementById("invalidFirstname");
      firstname.style.display = "none";
      let lastname = document.getElementById("invalidLastname");
      lastname.style.display = "none";
      let gender = document.getElementById("invalidGender");
      gender.style.display = "none";
      let phone = document.getElementById("invalidPhone");
      phone.style.display = "none";
      let takenPhone = document.getElementById("takenPhone");
      takenPhone.style.display = "none";
      let email = document.getElementById("takenEmail");
      email.style.display = "none";

      if (/First name can't be blank/.test(response.data.message)) {
        firstname.style.display = "block";
      }
      if (/Last name can't be blank/.test(response.data.message)) {
        lastname.style.display = "block";
      }
      if (this.state.gender === "") {
        gender.style.display = "block";
      }
      if (this.state.gender === "ผู้ชาย") {
        this.dealWithMaleClick();
      }
      if (this.state.gender === "ผู้หญิง") {
        this.dealWithFemaleClick();
      }
      if (/Phone number can't be blank/.test(response.data.message)) {
        phone.style.display = "block";
      }
      if (/Phone number has already been taken/.test(response.data.message)) {
        takenPhone.style.display = "block";
      }
      if (/Email has already been taken/.test(response.data.message)) {
        email.style.display = "block";
      }
      return response.data.message;
    })
    .then(message => {
      if (message === "Successful creation of new user!!" || "Successful update of existing user!!") {
        console.log("SUCCESS!!!");
        // this.props.toggle();
        navigateTo('app/list-of-leaders');
      } else {
        console.log("STILL ERRORS");
      }
    }); // axios.post

  }

  render() {
    if (this.state.window) {

      const { Container, Row, Col, Input, Button } = this.state.mdbreact;

      return(
        <Container>
          <Row>
            <Col md="12">

              <form onSubmit={this.handleSubmit} className='needs-validation' noValidate>
                <FormTitle className="text-center mb-4">{this.props.title}</FormTitle>
                <div className="grey-text">

                  <Input group type="hidden" name="gender" value={this.state.gender}/>
                  <Input group type="hidden" name="class_time_scheduled" value={this.props.trainingPeriodId}/>

                  <Input onChange={this.handleChange} label="First Name" icon="user" name="first_name" group type="text" validate error="wrong" success="right" required/>
                  <div id="invalidFirstname" style={{marginBottom: `25px`, marginTop: `-33px`, display: `none`, color: `red`}}>Please provide a first name.</div>

                  <Input onChange={this.handleChange} label="Last Name" icon="user" name="last_name" group type="text" validate error="wrong" success="right" required/>
                  <div id="invalidLastname" style={{marginBottom: `25px`, marginTop: `-33px`, display: `none`, color: `red`}}>Please provide a last name.</div>
                  
                  <Input onChange={this.handleChange} label="Phone Number" icon="phone" name="phone_number" group type="text" validate error="wrong" success="right" required/>
                  <div id="invalidPhone" style={{marginBottom: `25px`, marginTop: `-33px`, display: `none`, color: `red`}}>Please provide a phone number.</div>
                  <div id="takenPhone" style={{marginBottom: `25px`, marginTop: `-33px`, display: `none`, color: `red`}}>This phone number is already used by someone who registered with CEP.</div>

                  <Input onChange={this.handleChange} label="Email" icon="envelope" name="email" group type="email" validate error="wrong" success="right" required/>
                  <div id="takenEmail" style={{marginBottom: `25px`, marginTop: `-33px`, display: `none`, color: `red`}}>This email address is already used by someone who registered with CEP.</div>

                  <Input onChange={this.handleChange} label="Password" icon="lock" name="password" group type="password" validate error="wrong" success="right" required/>
                  <div id="shortPassword" style={{marginBottom: `25px`, marginTop: `-33px`, display: `none`, color: `red`}}>This is an invalid password (too short).</div>

                  <Input onChange={this.handleChange} label="Password Confirmation" icon="lock" name="password_confirmation" group type="password" validate error="wrong" success="right" required/>
                  <div id="shortPassword" style={{marginBottom: `25px`, marginTop: `-33px`, display: `none`, color: `red`}}>This is an invalid password (too short).</div>

                  <div>
                    <MaleStyler onClick={this.dealWithMaleClick}><i className="fa fa-male prefix"></i> Male</MaleStyler>
                    <FemaleStyler onClick={this.dealWithFemaleClick}><i className="fa fa-female prefix"></i> Female</FemaleStyler>
                  </div>
                  <div id="invalidGender" style={{marginBottom: `25px`, marginTop: `0px`, display: `none`, color: `red`}}>Please provide a gender.</div>
                  <br/>

                  <Button color="primary" type="submit">Submit</Button>
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