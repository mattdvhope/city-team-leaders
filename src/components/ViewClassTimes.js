import React, { Component } from 'react';
import axios from 'axios'
import styled from "styled-components";
// import { Table, TableBody, TableHead } from "mdbreact";

const CTStyler = styled.div`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  font-size: 90%;
`
const HeadEl = styled.div`
  font-size: 150%;
`

const TCell = styled.div`
  font-size: 120%;
`

export default class ViewClassTimes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      class_times: undefined,
      window: undefined,
      mdbreact: undefined
    };
  }

  componentDidMount() {
    axios.get(`${process.env.GATSBY_API_URL}/class_times.json`)
    .then((response) => {
      const class_times = this.filterSortPart(response.data);
      this.setState({ class_times: class_times });
    });

    this.setState({ window: window });
    try {
      const mdbreact = require("mdbreact");
      this.setState({ mdbreact: mdbreact });
    } catch (e) {
      console.error(e);
    }
  }

  filterSortPart(class_times) {
    var class_times_arr = [];
    class_times.forEach(function(class_time) {
      class_times_arr.push(class_time);
    });

    return class_times_arr.sort(function(a, b) {
      return a.order_no - b.order_no;
    });
  }

  render() {
    if (this.state.class_times && this.state.window) {
      const { Table, TableBody, TableHead } = this.state.mdbreact;
      return (
        <CTStyler className="container">
          <hr/>
          <h1>View Class Times</h1>
          {this.state.class_times.map((time, timeKey) => {
            return (
              <div key={timeKey+"pt1"}>
                <h3 key={time.period} value={time.period}>{time.period}</h3>
                <Table striped bordered hover>
                  <TableHead>
                    <tr>
                      <th><HeadEl>Nickname</HeadEl></th>
                      <th><HeadEl>First Name</HeadEl></th>
                      <th><HeadEl>Last Name</HeadEl></th>
                      <th><HeadEl>Gender</HeadEl></th>
                      <th><HeadEl>Phone Number</HeadEl></th>
                      <th><HeadEl>Email</HeadEl></th>
                      <th><HeadEl>Date Registered</HeadEl></th>
                    </tr>
                  </TableHead>
                  <TableBody key={time.period}>
                    {time.users.map((student, stuKey) => {
                      return (
                        <tr key={stuKey}>
                          <td key={student.nickname+"nick"}><TCell>{student.nickname}</TCell></td>
                          <td key={student.first_name+"first"}><TCell>{student.first_name}</TCell></td>
                          <td key={student.last_name+"last"}><TCell>{student.last_name}</TCell></td>
                          <td key={student.gender}><TCell>{student.gender}</TCell></td>
                          <td key={student.phone_number}><TCell>{student.phone_number}</TCell></td>
                          <td key={student.email}><TCell>{student.email}</TCell></td>
                          <td key={student.date_format}><TCell>{student.date_format}</TCell></td>
                        </tr>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )
          })}
        </CTStyler>
      )
    } else {
      return <span />
    }
  }
}