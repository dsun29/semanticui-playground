
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../../redux/actions'


describe('actions', () => {
    it('should return OPEN_SPINNER action type', () => {

        const expectedAction = {
            type: 'OPEN_SPINNER'
        }
        expect(actions.Open_Spinner()).toEqual(expectedAction)
    })

    it('should return CLOSE_SPINNER action type', () => {

        const expectedAction = {
            type: 'CLOSE_SPINNER'
        }
        expect(actions.Close_Spinner()).toEqual(expectedAction)
    })

})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('new user registration', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('register-successfully', () => {
        nock('http://localhost:8090')
            .post('/user/registration')
            .reply(201, { message: 'good job' });

        const expectedActions = [

            {type: 'OPEN_SPINNER'},
            {type: 'CLOSE_SPINNER'},
            { type: 'Register_Succeed' }

        ];

        const store = mockStore({  });

        return store.dispatch(actions.Register_Action('sundavy@gmail.com', 'abcee', null)).then(() => {

            expect(store.getActions()).toEqual(expectedActions)
        })
    });



    it('register-email exists', () => {
        nock('http://localhost:8090')
            .post('/user/registration')
            .reply(400, {message: 'email address exists'} );

        const expectedActions = [

            {type: 'OPEN_SPINNER'},
            {type: 'CLOSE_SPINNER'},
            { type: 'Register_Fail', message: 'email address exists' }


        ];

        const store = mockStore({  });

        return store.dispatch(actions.Register_Action('sundavy@gmail.com', 'abcee', null)).then(() => {

            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})
