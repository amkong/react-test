import React, { Component } from 'react';
import { Link } from 'react-router';
import _merge from 'lodash/merge';
import _map from 'lodash/map';
import './App.css';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(key) {
    return (e) => {
      this.props.onDataChange(key, e.target.value);
    }
  }

  render() {
    let formData = this.props.formData;

    return (
      <div>
        <form>
          <input
            type='text'
            placeholder='Your First Name'
            value={formData.firstName}
            onChange={this.handleChange('firstName')}
          />

          <input
            type='text'
            placeholder='Your Last Name'
            value={formData.lastName}
            onChange={this.handleChange('lastName')}
          />

          <input
            type='text'
            placeholder='Your Age'
            value={formData.age}
            onChange={this.handleChange('age')}
          />
        </form>
        <button onClick={this.props.formSubmit}>Submit</button>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.onDataChange = this.onDataChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        age: 0
      },
      jumbledName: '',
      index: 1
    }
  }

  nameSwapper(obj) {
    function swapName(name) {
    	let newName = "";

      for (let x = 0; x < name.length; x++)
      {
        let newChar = randChar(obj.age)
        newName += newChar
      }

      return newName;
    }

    function randChar(num) {
      let ASCII_MAX = 122;
      let ASCII_LOW = 97;
    	let rand = Math.floor(Math.random() * ASCII_MAX) + ASCII_LOW;
      let returnChar = ASCII_LOW + (rand % (ASCII_MAX - ASCII_LOW));
      return String.fromCharCode(returnChar)
    }

    return swapName(obj.lastName) + ' ' + swapName(obj.lastName);
  }

  formSubmit() {
    let url = 'http://requestb.in/x2tkozx2';
    let data = this.state.formData;
    let sendData = JSON.stringify(data);
    let index = this.state.index;

    // DO THIS STUFF IN RESPONSE TO API CALL (api broken?)
    let oldName = data.firstName + ' ' + data.lastName;
    let newName = this.nameSwapper(this.state.formData);
    this.setState({ jumbledName: newName })

    // storage of names list
    let names = { name: oldName, jumbleName: newName };
    sessionStorage.setItem(index, JSON.stringify(names));
    let newIndex = index + 1;
    this.setState({ index: newIndex });

    // fake api call, store names in browser
    axios.post(url, sendData, { withCredentials: true })
    .then((res) => {
      // broken?
    })
    .catch((err) => {
      console.log('API error: ', err);
    })
  }

  onDataChange(key, data) {
    let newFormData = {};
    newFormData[key] = data;
    let formData = this.state.formData;
    let newData = _merge(formData, newFormData);
    this.setState({ formData: newData });
  }

  render() {

    return (
      <div className="App">
        <p className="App-intro">
          Name Form
        </p>

        <Form   formData={this.state.formData}
                onDataChange={this.onDataChange}
                formSubmit={this.formSubmit}
                />

        <h3>{this.state.jumbledName}</h3>
        <Link to="/list"><button>List!</button></Link>
      </div>
    );
  }
}

export default App;
