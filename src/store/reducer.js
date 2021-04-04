import * as actionTypes from './actionTypes';

const initialState = {
    characters: [],
    hasNext: true,
    nextPage: 1,
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
            })
        case actionTypes.GET_NEXT_CHARACTERS:
            return updateObject(state, {
                characters: [...state.characters, ...action.characters.results],
                nextPage: state.nextPage + 1,
                hasNext: action.characters.next ? true : false
            })
            //TODO: DODAWAL 5 A NIE 10 ELEMENTÓW! 
        default:
            return state;
    }
};

export default reducer;