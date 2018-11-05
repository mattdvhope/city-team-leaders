import React from "react"
import { Link } from 'gatsby'

import styled from "styled-components";

const DashStyler = styled.div`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  font-size: 200%;
`

export default () => {
  return (
    <DashStyler className="container">
      <hr/>
      <div className="row">
        <div className="col-md-12">
          <Link to="/app/view-class-times">View class times & the students in them</Link>
        </div>
      </div>
    </DashStyler>
  )
}

