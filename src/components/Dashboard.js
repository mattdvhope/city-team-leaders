import React from "react"
import { Link } from 'gatsby'

import styled from "styled-components";

const DashStyler = styled.div`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  font-size: 200%;
`

const RowStyler = styled.div`
  display: block;
  height: 1px;
  border: 0;
  border-top: 5px solid #ccc;
  margin: 1em 0;
  padding-bottom: 2%;
`

export default () => {
  return (
    <DashStyler className="container">
      <RowStyler className="row">
        <div className="col-md-12">
          <Link to="/app/view-class-times">View class times & the students in them</Link>
        </div>
      </RowStyler>
      <RowStyler className="row">
        <div className="col-md-12">
          <Link to="/app/add-leader">Add Leader</Link>
        </div>
      </RowStyler>
      <RowStyler className="row">
        <div className="col-md-12">
          <Link to="/app/list-of-leaders">See List of Leaders</Link>
        </div>
      </RowStyler>
      <RowStyler className="row">
        <div className="col-md-12">
          <Link to="/app/add-class-time">Add Class Time</Link>
        </div>
      </RowStyler>
      <RowStyler className="row">
      </RowStyler>
    </DashStyler>
  )
}

