/**
 * Created by dayong on 7/31/17.
 */
import React, {Component} from 'react'
import { Grid, Segment, Container, Menu, Icon, Button, Dropdown, Label, Header } from 'semantic-ui-react'


export default class TopHeaderComponent extends Component {


    state = {activeItem: null}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (
            <Container fluid>
                <Segment vertical inverted>
                    <Grid>
                    <Container>
                        <Menu inverted pointing>
                            <Menu.Item header position="left">

                                <Header as='h2' inverted>
                                    <Icon name='student'/>
                                    <Header.Content>
                                        FullStackRebel
                                    </Header.Content>
                                </Header>
                            </Menu.Item>

                            <Menu.Item name='gamepad' active={activeItem === 'gamepad'} onClick={this.handleItemClick}
                                       position="right">
                                <Label color='teal'><Icon name='mail' />22</Label>
                            </Menu.Item>

                            <Menu.Item name='gamepad' active={activeItem === 'gamepad'} onClick={this.handleItemClick}
                                       position="right">
                                <Icon name='content' size="large"/> My Posts
                            </Menu.Item>

                            <Menu.Item name='video camera' active={activeItem === 'video camera'}
                                       onClick={this.handleItemClick} position="right">
                                <Icon name='compose' size="large"/> Add Post
                            </Menu.Item>

                            <Menu.Item name='video play' active={activeItem === 'video play'}
                                       onClick={this.handleItemClick} position="right">
                                <Button color='green'>
                                    <Icon name='user'/> Sign In
                                </Button>
                            </Menu.Item>

                            <Menu.Item name='video play' active={activeItem === 'video play'}
                                       onClick={this.handleItemClick} position="right">
                                <Button color='teal'>
                                    <Icon name='add user'/> Sign Up
                                </Button>
                            </Menu.Item>


                            <Dropdown item text='Dayong Sun'>
                                <Dropdown.Menu>
                                    <Dropdown.Item><Icon name='user' size="small"/> My Profile</Dropdown.Item>
                                    <Dropdown.Item>Change Password</Dropdown.Item>
                                    <Dropdown.Item>Stats</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Menu>

                    </Container>
                    </Grid>
                </Segment>
            </Container>
        )
    }

}

