/**
 * Created by dayong on 8/3/17.
 */
import RegisterComponent from '../../components/RegisterComponent'

import React from 'react'
import { mount } from 'enzyme'
import { Icon, Menu, Container, Segment, Grid, Header, Form, Button, Input, Message, Divider, Label } from 'semantic-ui-react'

function setup() {
    const props = {
        register: jest.fn()
    }

    const enzymeWrapper = mount(<RegisterComponent {...props} />)

    return {
        props,
        enzymeWrapper
    }
}


describe('Registeromponent', () => {


    it('should have email and 2 password inputs ', () => {
        const { enzymeWrapper, props } = setup();

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

        expect(props.register.mock.calls.length).toBe(0);

    })

    it('should display error when email address is invalid', () => {
        const { enzymeWrapper, props } = setup();

        const form = enzymeWrapper.find('Form');

        const emailInput = form.find('input').at(0);
        emailInput.simulate('change', {target: {value: 'abcdes'}});

        form.simulate('submit');

        expect(enzymeWrapper.findWhere(n => n.name() === 'Label' && n.prop('color') === 'red').at(0).text()).toBe('Invalid email address');

        expect(props.register.mock.calls.length).toBe(0);


    });

    it('should display invalid password', () => {
        const { enzymeWrapper, props } = setup();

        const form = enzymeWrapper.find('Form');

        const emailInput = form.find('input').at(0);
        emailInput.simulate('change', {target: {value: 'sundavy@gmail.com'}});

        const passwordInput = form.find('input').at(1);
        passwordInput.simulate('change', {target: {value: '12345678'}});

        form.simulate('submit');

        expect(enzymeWrapper.findWhere(n => n.name() === 'Label' && n.prop('color') === 'red').at(0).text()).toBe('Password is required with minimum of 10 characters');

    });

    it('should display password not match', () => {
        const { enzymeWrapper, props } = setup();

        const form = enzymeWrapper.find('Form');

        const emailInput = form.find('input').at(0);
        emailInput.simulate('change', {target: {value: 'sundavy@gmail.com'}});

        const passwordInput = form.find('input').at(1);
        passwordInput.simulate('change', {target: {value: '123456789012'}});

        const passwordInput2 = form.find('input').at(2);
        passwordInput2.simulate('change', {target: {value: '123'}});

        form.simulate('submit');

        expect(enzymeWrapper.findWhere(n => n.name() === 'Label' && n.prop('color') === 'red').at(0).text()).toBe('Two passwords must much each other');

        expect(props.register.mock.calls.length).toBe(0);

    });

    it('should submit registration request', () => {
        const { enzymeWrapper, props } = setup();

        const form = enzymeWrapper.find('Form');

        const emailInput = form.find('input').at(0);
        emailInput.simulate('change', {target: {value: 'sundavy@gmail.com'}});

        const passwordInput = form.find('input').at(1);
        passwordInput.simulate('change', {target: {value: '123456789012'}});

        const passwordInput2 = form.find('input').at(2);
        passwordInput2.simulate('change', {target: {value: '123456789012'}});

        form.simulate('submit');

        expect(props.register.mock.calls.length).toBe(1);
        expect(props.register.mock.calls[0][0]).toBe('sundavy@gmail.com');
        expect(props.register.mock.calls[0][1]).toBe('123456789012');
        expect(props.register.mock.calls[0][2]).toBe(null);

        expect(enzymeWrapper.findWhere(n => n.name() === 'Label' && n.prop('color') === 'red').length).toBe(0);

    });


})
