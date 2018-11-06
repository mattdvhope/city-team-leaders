import React from "react"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"

import Layout from "../components/layout"

const IndexPage = () => {
  return (
    <Layout>
      <br/>
      <h1>Hi {isLoggedIn() ? getUser().first_name : "people"}</h1>
      <div>
        {isLoggedIn() ? (
          <div>
            You are logged in, so check your{" "}
            <Link to="/app/dashboard">dashboard</Link>
          </div>
        ) : (
          <div>
            <h2>You should <Link to="/app/login">log in</Link>.</h2>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage