import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/charList/CharListSlice';
import hero from '../components/charInfo/CharInfoSlice';
import random from '../components/randomChar/RandomCharSlice';
import findChar from '../components/findChar/FindCharSlice';



const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
};

const store = configureStore({
    reducer: {heroes, hero, random, findChar},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;