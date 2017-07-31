/**
 * Created by dayong on 7/31/17.
 */

import React, { Component } from 'react'
import { Icon, Menu, Container, Segment, Grid } from 'semantic-ui-react'

export default class MainMenuComponent extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (

        <Container fluid>
            <Segment vertical inverted color="brown">
                <Grid>
                    <Container>

                        <Menu icon='labeled' secondary stackable inverted>

                            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                                <Icon name='home' />
                                Home
                            </Menu.Item>

                            <Menu.Item name='configure' active={activeItem === 'configure'} onClick={this.handleItemClick}>
                                <Icon name='configure' />
                                DevOps
                            </Menu.Item>

                            <Menu.Item name='laptop' active={activeItem === 'laptop'} onClick={this.handleItemClick}>
                                <Icon name='laptop' />
                                Programming
                            </Menu.Item>

                            <Menu.Item name='cloud' active={activeItem === 'cloud'} onClick={this.handleItemClick}>
                                <Icon name='cloud' />
                                AWS & Cloud
                            </Menu.Item>

                            <Menu.Item name='paw' active={activeItem === 'paw'} onClick={this.handleItemClick}>
                                <Icon name='paw' />
                                Recreation
                            </Menu.Item>

                        </Menu>


                    </Container>
                </Grid>
            </Segment>
        </Container>



        )
    }
}
