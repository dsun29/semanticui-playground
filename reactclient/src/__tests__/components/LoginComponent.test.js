/**
 * Created by dayong on 8/3/17.
 */
import LoginComponent from '../../components/LoginComponent'

import React from 'react'
import { mount } from 'enzyme'

function setup() {
    const props = {

    }

    const enzymeWrapper = mount(<LoginComponent {...props} />)

    return {
        props,
        enzymeWrapper
    }
}


describe('LoginComponent', () => {


    it('should have email and password input ', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.find('Header').length).toBe(2);

        expect(enzymeWrapper.find('Header').last().text()).toBe('Log-in to your account');

        expect(enzymeWrapper.find('Input').length).toBe(2);

        expect(enzymeWrapper.find('Button').length).toBeGreaterThanOrEqual(3);

    })


})
