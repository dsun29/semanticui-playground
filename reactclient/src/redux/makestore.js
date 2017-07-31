/**
 * Created by dayong on 7/31/17.
 */

import { createStore, applyMiddleware } from 'redux';
import Reducer from './reducer';
import thunk from 'redux-thunk';

export function makeStore(state) {

    return createStore(Reducer, state, applyMiddleware(thunk));
}