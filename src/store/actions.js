import * as actionTypes from './actionTypes';
import axios from '../axios';

export const fetchFirstCharacters = () => {
    return dispatch => {
        const route = '/people/?page=1';
        axios.get(route)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getFirstCharacters(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getFirstCharacters = (characters) => {
    return {
        type: actionTypes.INIT_CHARACTERS,
        characters: characters
    }
}

export const fetchNextCharacters = (page) => {
    return dispatch => {
        const route = '/people/?page=' + page;
        axios.get(route)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getNextCharacters(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getNextCharacters = (characters) => {
    return {
        type: actionTypes.GET_NEXT_CHARACTERS,
        characters: characters
    }
}
