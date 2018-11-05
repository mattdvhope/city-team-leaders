import React from "react"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"

import Layout from "../components/layout"

const IndexPage = () => {
  return (
    <Layout>
      <br/>
      <h1>Hi {isLoggedIn() ? getUser().name : "people"}</h1>
      <div>
        {isLoggedIn() ? (
          <div>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </div>
        ) : (
          <div>
            You should <Link to="/app/login">log in</Link> to see restricted
            content
          </div>
        )}
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage