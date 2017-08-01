/**
 * Created by dayong on 8/1/17.
 */
/**
 * Created by dayong on 7/31/17.
 */

import React, { Component } from 'react'
import Layout from './Layout'
import { Icon, Menu, Container, Segment, Grid, Header, Form, Button, Input, Message, Divider, Label } from 'semantic-ui-react'

export default class RegisterComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }

        this.validate = this.validate.bind(this);
    }

    validate(e) {

        e.preventDefault();


        this.setState({emailErrorMsg: null})
        this.setState({passwordErrorMsg: null})
        this.setState({password2ErrorMsg: null})

        var email = this.state.email;
        if(email === undefined || email === null || email.length < 1){
            this.setState({emailErrorMsg: 'Email address is required'})
        }
        else{
            var re = /^\w+@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if(re.test(email) === false){
                this.setState({emailErrorMsg: 'Invalid email address'})
            }
        }

        var password = this.state.password;
        if(password === undefined || password === null || password.length < 10){
            this.setState({passwordErrorMsg: 'Password is required with minimum of 10 characters'})
        }
        else if(password.length > 24){
            this.setState({passwordErrorMsg: 'Password can contain no more than 24 characters'})
        }

        var password2 = this.state.password2;
        if(password2 === undefined || password2 === null){
            this.setState({password2ErrorMsg: 'Password is required'})
        }
        else if (password2 !== password) {
            this.setState({password2ErrorMsg: 'Two passwords must much each other'})
        }

        if (this.state.emailErrorMsg === null && this.state.passwordErrorMsg === null && this.state.password2ErrorMsg === null) {
            //submit
        }

    }

    render() {


        return (

            <Layout>

                <Grid textAlign="center">
                    <Grid.Column style={{ maxWidth: 550 }}>
                        <Container textAlign="left">
                            <Divider hidden/>
                            <Header as="h2">Register</Header>

                            <Form size="large" onSubmit={(e) => this.validate(e)}>
                                <Segment stacked secondary>
                                    <Form.Field>
                                        <label>Email Address</label>
                                        <Input placeholder='Email address' error={this.state.emailErrorMsg ? true : false} icon="at" iconPosition="left" type="email"
                                            onChange={e => this.setState({email: e.target.value})}
                                        />
                                        {
                                            this.state.emailErrorMsg ? (<Label basic color='red' pointing>{this.state.emailErrorMsg}</Label>) : null
                                        }

                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <Input placeholder='Password' icon="lock" error={this.state.passwordErrorMsg ? true : false} iconPosition="left" type="password"
                                               onChange={e => this.setState({password: e.target.value})}
                                        />
                                        {
                                            this.state.passwordErrorMsg ? (<Label basic color='red' pointing>{this.state.passwordErrorMsg}</Label>) : null
                                        }

                                    </Form.Field>
                                    <Form.Field>
                                        <label>Confirm password</label>
                                        <Input placeholder='Confirm password' error={this.state.password2ErrorMsg ? true : false} icon="lock" iconPosition="left" type="password"
                                               onChange={e => this.setState({password2: e.target.value})}
                                        />
                                        {
                                            this.state.password2ErrorMsg ? (<Label basic color='red' pointing>{this.state.password2ErrorMsg}</Label>) : null

                                        }

                                    </Form.Field>

                                    <Button type='submit' fluid color="teal">Submit</Button>

                                </Segment>
                            </Form>

                            <Message>
                                Already registered? <a href="/">Log In</a>
                            </Message>

                        </Container>

                    </Grid.Column>
                </Grid>
            </Layout>



        )
    }
}
