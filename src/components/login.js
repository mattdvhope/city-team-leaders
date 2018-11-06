import React from "react"
import { navigate } from "gatsby"
import axios from 'axios';
import LoginForm from "./loginForm";
import { handleLogin, isLoggedIn } from "../services/auth"

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let email = this.state.email;
    email = email.toLocaleLowerCase();
    const password = this.state.password;
    const promise = new Promise((resolve, reject) => {
      resolve(axios.post(`${process.env.GATSBY_API_URL}/sessions`, {email, password}));
    });
    promise
    .then((res) => {
      const { first_name, last_name, email } = res.data;
      handleLogin({first_name, last_name, email});
      navigate(`/app/dashboard`);
    })
    .catch((err) => { 
      console.log("ERROR:", err);
    });
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/app/dashboard`)
    }

console.log("in render()");

    return (
      <div>
        <LoginForm
          handleSubmit={this.handleSubmit}
          handleUpdate={this.handleUpdate}
        />
      </div>
    )
  }
}
// see 'https://www.gatsbyjs.org/docs/authentication-tutorial/'
// to learn how to set up "LOGIN" in Gatsby 2
