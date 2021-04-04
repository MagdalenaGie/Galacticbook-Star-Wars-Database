import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './../../store/actions';
import ListElement from './ListElement/ListElement';

const List = () => {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(actions.fetchFirstCharacters());
    }, [dispatch])

    const charactersList = useSelector(state => state.characters);
    const page = useSelector(state => state.nextPage);
    const hasNextPage = useSelector(state => state.hasNext);

    console.log(charactersList);

    const listToDisplay = charactersList.map(char => (
        <ListElement name={char.name} key={char.url} url={char.url} id={charactersList.indexOf(char)+1}/>
    ))

    return(
        <div className="List">
            <h1>May the list be with you!</h1>
            {listToDisplay}
            {hasNextPage ? <button onClick={() => dispatch(actions.fetchNextCharacters(page))}>GET NEXT</button> : null}
        </div>
    )
}

export default List;