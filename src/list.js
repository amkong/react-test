import React, { Component } from 'react';
import axios from 'axios';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import './App.css';

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <div>
        <p className="names">{props.name} = {props.jumbleName}</p>
        <button onClick={() => {props.deleteName(props.index)}}>Delete</button>
      </div>
    )
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    this.deleteName = this.deleteName.bind(this);
    // loop through session storage and push to state
    let length = sessionStorage.length;
    let list = [];
    for (var i = 1; i <= length; i++) {
      let item = JSON.parse(sessionStorage.getItem(i));
      item.key = i;
      list.push(item);
    }

    this.state = {
      list: list
    }
  }

  sortBy(field) {
    let unsortedList = this.state.list;
    let sortedList = _sortBy(unsortedList, field);
    this.setState({ list: sortedList })
  }

  deleteName(index) {
    // fake api call, delete from list on success
    let url = 'http://requestb.in/x2tkozx2';
    let sendData = JSON.stringify(index);
    let list = this.state.list;
    list.splice(index - 1, 1);
    this.setState({ list: list });

    axios.post(url, sendData)
      .then(function() {
        // broken?
      })
      .catch(function(err) {
        console.log('Error thrown: ', err);
      })
  }

  render() {
    let list = this.state.list;
    let itemHtml = _map(list, (item) => {
      return (<ListItem key={item.key} index={item.key} name={item.name} jumbleName={item.jumbleName} deleteName={this.deleteName}/>)
    })

    return (
      <div className="App">
        <h2>sort by: </h2>
          <button id='name' onClick={() => {this.sortBy('name')}}>Name</button>
          <button id='jumblename' onClick={() => {this.sortBy('jumbleName')}}>Jumbled Name</button>
        { itemHtml }
      </div>
    )
  }
}

export default List;
