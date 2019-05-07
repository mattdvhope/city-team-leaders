import React, { Component } from 'react';
import axios from 'axios'
import styled from "styled-components";

const LeaderListStyler = styled.div`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  font-size: 90%;
`

const HeadEl = styled.div`
  font-size: 150%;
`

const TCell = styled.div`
  font-size: 120%;
`

export default class ListOfLeaders extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      leaders: undefined,
      window: undefined,
      mdbreact: undefined
    };
  }

  componentDidMount() {
    axios.get(`${process.env.GATSBY_API_URL}/leaders.json`)
    .then((response) => {
      const leaders = response.data;
      this.setState({ leaders: leaders });
    });

    this.setState({ window: window });
    try {
      const mdbreact = require("mdbreact");
      this.setState({ mdbreact: mdbreact });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    if (this.state.leaders && this.state.window) {
      const { Table, TableBody, TableHead } = this.state.mdbreact;
      return (
        <LeaderListStyler className="container">
          <hr/>
          <h1>Here is a list of leaders:</h1>
          
                <Table striped bordered hover>
                  <TableHead>
                    <tr>
                      <th><HeadEl>First Name</HeadEl></th>
                      <th><HeadEl>Last Name</HeadEl></th>
                      <th><HeadEl>Phone Number</HeadEl></th>
                      <th><HeadEl>Email</HeadEl></th>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {this.state.leaders.map((leader) => {
                      return (
                        <tr key={Math.random()}>
                          <td key={leader.first_name+"first"}><TCell>{leader.first_name}</TCell></td>
                          <td key={leader.last_name+"last"}><TCell>{leader.last_name}</TCell></td>
                          <td key={leader.phone_number}><TCell>{leader.phone_number}</TCell></td>
                          <td key={leader.email}><TCell>{leader.email}</TCell></td>
                        </tr>
                      );
                    })}
                  </TableBody>
                </Table>

                    
        </LeaderListStyler>
      )
    } else {
      return <span />
    }
  }
}