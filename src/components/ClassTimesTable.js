import React, { Component } from 'react'
import styled from "styled-components";

const HeadEl = styled.div`
  font-size: 150%;
`

const TCell = styled.div`
  font-size: 120%;
`

const ArchiveTag = styled.span`
  font-size: 110%;
  color: red;
  font-style: italic;
  cursor: pointer;
`

export default class ClassTimesTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      window: undefined,
      mdbreact: undefined
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

  render() {
    console.log("in render in ClassTimesTable")
    if (this.state.window) {
      const { Table, TableBody, TableHead } = this.state.mdbreact;

      return (
        <div key={this.props.timeKey+"pt1"}>
          <br/>
          <h4 key={this.props.time.period} value={this.props.time.period}>{this.props.time.period}&nbsp;&nbsp;-->&nbsp;{this.props.time.order_no}&nbsp;&nbsp;<ArchiveTag hidden={this.props.time.completed === true ? true : false} onClick={this.props.handleArchive}>Archive</ArchiveTag></h4>
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
            <TableBody key={this.props.time.period}>
              {this.props.time.users.map((student, stuKey) => {
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

    } else {
      return <span />
    }

  }
}