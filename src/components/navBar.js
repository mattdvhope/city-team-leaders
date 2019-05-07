import React from "react"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"

export default () => {
  const content = { message: "", login: true }
  if (isLoggedIn()) {
    content.message = `Hello, ${getUser().first_name}`
  } else {
    content.message = "You are not logged in"
  }
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <span>{content.message}</span>

      <nav>
        {
          isLoggedIn() ? (
            <span>
              |&nbsp;
              <Link to="/app/dashboard">Dashboard</Link>
              &nbsp;|&nbsp;
              <a
                href="/"
                onClick={event => {
                  event.preventDefault()
                  logout(() => navigate(`/app/login`))
                }}
              >
                Logout
              </a>
              &nbsp;|
            </span>
          ) : null
        }
      </nav>
    </div>
  )
}