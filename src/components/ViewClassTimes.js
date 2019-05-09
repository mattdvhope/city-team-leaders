import React, { Component } from 'react';
import axios from 'axios'
import styled from "styled-components";
import ClassTimesTable from './ClassTimesTable'

const CTStyler = styled.div`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  font-size: 90%;
`

export default class ViewClassTimes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      class_times: undefined,
      class_times_done: undefined,
      window: undefined,
    };
  }

  componentDidMount() {
    axios.get(`${process.env.GATSBY_API_URL}/class_times.json`)
    .then((response) => {
      this.setState({ class_times: this.filterSortPart(response.data) });
      this.setState({ class_times_done: this.filterSortDone(response.data)});
    });
    this.setState({ window: window });
  }

  filterSortPart(class_times) {
    var class_times_arr = [];
    class_times.forEach(function(class_time) {
      if (class_time.completed === false) {
        class_times_arr.push(class_time)
      }
    });

    return class_times_arr.sort(function(a, b) {
      return a.order_no - b.order_no;
    });
  }

  filterSortDone(class_times) {
    var class_times_arr = [];
    class_times.forEach(function(class_time) {
      if (class_time.completed === true) {
        class_times_arr.push(class_time)
      }
    });

    return class_times_arr.sort(function(a, b) {
      return b.order_no - a.order_no;
    });
  }

  handleArchive(e, id) {
    e.preventDefault();
    axios.patch(`${process.env.GATSBY_API_URL}/class_times/${id}`)
    .then(response => {
      this.componentDidMount();
    })
    .catch(error => console.log(error))
  }

  render() {
    if (this.state.class_times && this.state.class_times_done && this.state.window) {
      return (
        <CTStyler className="container">
          <hr/>
          <h1>View Current Class Times</h1>
          {this.state.class_times.map((time, timeKey) => {
            return (
              <ClassTimesTable handleArchive={e => this.handleArchive(e, time.id)} key={time.id} time={time} timeKey={timeKey} />
            )
          })}
          <br/>
          <br/>
          <hr/>
          <hr/>
          <br/>
          <br/>
          <h1>View Previous Class Times (most recent on top)</h1>
          {this.state.class_times_done.map((time, timeKey) => {
            return (
              <ClassTimesTable key={time.id} time={time} timeKey={timeKey} />
            )
          })}
        </CTStyler>
      )
    } else {
      return <span />
    }
  }
}