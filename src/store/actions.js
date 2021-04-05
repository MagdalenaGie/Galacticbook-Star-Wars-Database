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

export const fetchNextCharacters = (page, hasBuffer) => {
    if(!hasBuffer){
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
    }else{
        return {
            type: actionTypes.GET_NEXT_CHARACTERS_FROM_BUFFER
        }
    }
    
}

export const getNextCharacters = (characters) => {
    return {
        type: actionTypes.GET_NEXT_CHARACTERS,
        characters: characters
    }
}

export const fetchCharacterData = (id) => {
    return dispatch => {
        axios.get('/people/'+id)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getCharacterData(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getCharacterData = (data) => {
    return {
        type: actionTypes.GET_CHARACTER_DATA,
        data: data
    }
}

export const fetchFilms = () => {
    return dispatch => {
        axios.get('/films/')
        .then(res => {
            const fetchedData = res.data;
            dispatch(getFilms(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getFilms = (films) => {
    return {
        type: actionTypes.GET_FILMS,
        films: films
    }
}
