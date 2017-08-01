/**
 * Created by dayong on 7/31/17.
 */

import React, { Component } from 'react'
import Layout from './Layout'
import { Icon, Menu, Container, Segment, Grid, Header, Form, Button, Input, Message, Divider } from 'semantic-ui-react'

export default class LoginComponent extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (

            <Layout>

            <Grid textAlign="center">
                <Grid.Column>
                    <Container>
                        <Divider hidden/>

                        <Header as="h2">Log-in to your account</Header>
                        <Form size="large">
                            <Segment stacked secondary>
                                <Form.Field>

                                    <Input placeholder='Email address' icon="user" iconPosition="left"/>
                                </Form.Field>
                                <Form.Field>

                                    <Input placeholder='Password' icon="lock" iconPosition="left"/>
                                </Form.Field>

                                <Button type='submit' fluid color="teal">Submit</Button>

                            </Segment>
                        </Form>

                        <Message>
                            New to us? <a href="/">Register</a>
                        </Message>

                    </Container>

                </Grid.Column>
            </Grid>
            </Layout>



        )
    }
}
