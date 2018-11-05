import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      window: undefined,
      email: ``,
      password: ``
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

  handleUpdate = event => {
console.log("in handleUpdate");
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
console.log("in handleSubmit");
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (this.state.window) {

      const { Input, Button } = this.state.mdbreact;

      if (isLoggedIn()) {
        navigate(`/app/profile`)
      }

      return (
        <div>
          <h1>Log in with johnny@example.org</h1>
          <form
            method="post"
            onSubmit={event => {
              this.handleSubmit(event)
              navigate(`/app/profile`)
            }}
          >
          <Input
            onChange={this.handleUpdate}
            label="Type your email"
            icon="envelope"
            group
            type="email"
            name="email"
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
            <div className="text-center">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      );
    } else {
      return <span />
    }

  }
}