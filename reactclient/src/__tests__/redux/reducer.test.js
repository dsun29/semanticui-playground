/**
 * Created by dayong on 8/3/17.
 */

import Reducer from '../../redux/reducer'

describe('reducer', () => {
    it('should return the initial state', () => {
        expect(Reducer(undefined, {})).toEqual(
            {
            }
        )
    });

    it('should handle OPEN_SPINNER', () => {
        expect(
            Reducer({}, {
                type: 'OPEN_SPINNER'
            })
        ).toEqual(
            {
                showSpinner: true
            }
        )
    });

    it('should handle CLOSE_SPINNER', () => {
        expect(
            Reducer({}, {
                type: 'CLOSE_SPINNER'
            })
        ).toEqual(
            {
                showSpinner: false
            }
        )
    });

    it('should handle Register_Succeed', () => {
        expect(
            Reducer({}, {
                type: 'Register_Succeed'
            })
        ).toEqual(
            {

            }
        )
    });

    it('should handle Register_Fail', () => {
        expect(
            Reducer({}, {
                type: 'Register_Fail',
                message: 'email exists'
            })
        ).toEqual(
            {
                message: 'email exists'
            }
        )
    });
});