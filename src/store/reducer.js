import * as actionTypes from './actionTypes';

const initialState = {
    characters: [],
    isLoading: false,
    characterBuffer: [],
    hasBuffer: false,
    films: '',
    characterData: '',
    hasNext: true,
    nextPage: 1,
    sort: '',
    filterFilm: 'none',
    filterGender: 'none'
}

const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject, 
        ...updatedProperties
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_CHARACTERS:
            return updateObject(state, {
                characters: [...action.characters.results],
                nextPage: 2,
                isLoading: false
            })
        case actionTypes.START_LOADING_CHARACTERS:
            return updateObject(state, {
                isLoading: true
            })
        case actionTypes.GET_NEXT_CHARACTERS:
            return updateObject(state, {
                characters: [...state.characters, ...action.characters.results.slice(0, 5)],
                characterBuffer: [...action.characters.results.slice(5, 10)],
                nextPage: state.nextPage + 1,
                hasNext: action.characters.next ? true : false,
                hasBuffer: true,
                isLoading:false
            })
            //TODO: DODAWAL 5 A NIE 10 ELEMENTÓW! 
        case actionTypes.GET_NEXT_CHARACTERS_FROM_BUFFER:
            return updateObject(state, {
                characters:[...state.characters, ...state.characterBuffer],
                characterBuffer: [],
                hasBuffer: false,
                isLoading:false
            })
        case actionTypes.GET_CHARACTER_DATA:
            return updateObject(state, {
                characterData: action.data
            })
        case actionTypes.GET_FILMS:
            return updateObject(state, {
                films: [...action.films.results]
            })
        case actionTypes.SET_FILTER_FILM:
            return updateObject(state, {
                filterFilm: action.filter
            })
        case actionTypes.SET_FILTER_GENDER:
            return updateObject(state, {
                filterGender: action.filter
            })
        case actionTypes.SET_SORT:
            return updateObject(state, {
                sort: action.sort
            })
        default:
            return state;
    }
};

export default reducer;