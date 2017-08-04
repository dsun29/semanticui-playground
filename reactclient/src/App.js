import React, { Component } from 'react';

import './App.css';
import { Container, Grid } from 'semantic-ui-react'

import RegisterContainer from './containers/RegisterContainer'

class App extends Component {
  render() {
    return (

            <RegisterContainer/>
    );
  }
}

export default App;
