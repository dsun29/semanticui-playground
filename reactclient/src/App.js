import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Grid } from 'semantic-ui-react'
import TopHeaderComponent from './components/TopHeaderComponent'
import MainMenuComponent from './components/MainMenuComponent'

class App extends Component {
  render() {
    return (
        <Container fluid>

                <TopHeaderComponent/>

                <MainMenuComponent/>

        </Container>

    );
  }
}

export default App;
