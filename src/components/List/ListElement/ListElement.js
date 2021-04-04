import React from 'react';
import './ListElement.css';
import CharacterDetails from './../../CharacterDetails/CharacterDetails';
import { useHistory, Redirect } from "react-router-dom";

const ListElement = (props) => {
    let history = useHistory();

    const displayDetails = (url) => {
        history.push('/characters/' + props.id);
    }

    return(
        <div className="ListElement" onClick={() => displayDetails(props.url)}>
            {props.name}
            {/* <Redirect to={"/characters/"+props.id} /> */}
            {/* <Route path={"/characters/:id"} exact component={CharacterDetails}/> */}
        </div>
    )
}

export default ListElement;