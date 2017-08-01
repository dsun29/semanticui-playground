/**
 * Created by dayong on 8/1/17.
 */
import React from 'react';
import TopHeaderComponent from '../components/TopHeaderComponent'
import MainMenuComponent from '../components/MainMenuComponent'

import { Container } from 'semantic-ui-react'



export default class Layout extends React.Component {

    render() {
        return (
            <Container fluid>
                <TopHeaderComponent/>
                <MainMenuComponent />


                    {this.props.children}

            </Container>
        );
    }
}