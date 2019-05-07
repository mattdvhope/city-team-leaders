import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Dashboard from "../components/Dashboard"
import ViewClassTimes from "../components/ViewClassTimes"
import AddLeader from "../components/AddLeader"
import ListOfLeaders from "../components/ListOfLeaders"
import Login from "../components/login"

export default () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <PrivateRoute path="/app/view-class-times" component={ViewClassTimes} />
      <PrivateRoute path="/app/add-leader" component={AddLeader} />
      <PrivateRoute path="/app/list-of-leaders" component={ListOfLeaders} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

// see 'https://www.gatsbyjs.org/docs/authentication-tutorial/'
// to learn how to set up "LOGIN" in Gatsby 2