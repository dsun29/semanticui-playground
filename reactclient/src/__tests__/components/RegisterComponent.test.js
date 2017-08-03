/**
 * Created by dayong on 8/3/17.
 */
import Registeromponent from '../../components/RegisterComponent'

import React from 'react'
import { mount } from 'enzyme'
import { Icon, Menu, Container, Segment, Grid, Header, Form, Button, Input, Message, Divider, Label } from 'semantic-ui-react'

function setup() {
    const props = {

    }

    const enzymeWrapper = mount(<Registeromponent {...props} />)

    return {
        props,
        enzymeWrapper
    }
}


describe('Registeromponent', () => {


    it('should have email and 2 password inputs ', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.find('Header').length).toBe(2);

        expect(enzymeWrapper.find('Header').last().text()).toBe('Register');

        expect(enzymeWrapper.find('Input').length).toBeGreaterThanOrEqual(3);

        expect(enzymeWrapper.find('Button').length).toBeGreaterThanOrEqual(3);

    });

    it('should display error when all three fiels are empty', () => {
        const { enzymeWrapper, props } = setup();

        const form = enzymeWrapper.find('Form');
        form.simulate('submit');

        expect(enzymeWrapper.findWhere(n => n.name() === 'Label' && n.prop('color') === 'red').at(0).text()).toBe('Email address is required');

        expect(enzymeWrapper.findWhere(n => n.name() === 'Label' && n.prop('color') === 'red').at(1).text()).toBe('Password is required with minimum of 10 characters');

        expect(enzymeWrapper.findWhere(n => n.name() === 'Label' && n.prop('color') === 'red').at(2).text()).toBe('Password is required');

    })

    it('should display error when email address is invalid', () => {
        const { enzymeWrapper, props } = setup();

        const form = enzymeWrapper.find('Form');

        const emailInput = form.find('input').at(0);
        emailInput.simulate('change', {target: {value: 'abcdes'}});
        

        form.simulate('submit');

        expect(enzymeWrapper.findWhere(n => n.name() === 'Label' && n.prop('color') === 'red').at(0).text()).toBe('Invalid email address');


    })



})
