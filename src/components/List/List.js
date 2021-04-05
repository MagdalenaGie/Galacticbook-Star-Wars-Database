import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../store/actions';
import ListElement from './ListElement/ListElement';
import CharacterDetails from './../CharacterDetails/CharacterDetails';
import Spinner from './../UI/Spinner/Spinner';
import Button from './../UI/Button/Button';
import { Route } from "react-router-dom";

class List extends Component {
    componentDidMount(){
        this.props.onFetchFirstCharacters();
    }

    onClickCharacter = (id) => {
        this.props.history.push('/characters/' + id);
    }

    render(){
        let listToDisplay = <Spinner/>
        if(this.props.charactersList.length > 0){
            listToDisplay = this.props.charactersList.map(char => (
                <ListElement 
                    name={char.name} 
                    key={char.url} 
                    gender={char.gender}
                    by={char.birth_year}
                    clicked = {() => this.onClickCharacter(this.props.charactersList.indexOf(char)+1)}
                />)
            )
        }

        return(
            <div className="List">
                <h1>May the list be with you!</h1>
                {listToDisplay}
                {this.props.hasNextPage ? <Button clicked={() => this.props.onFetchNextCharacters(this.props.page, this.props.hasBuffer)}>Load next 5</Button> : null}
                <Route path={this.props.match.url + "/characters/:id"} component={CharacterDetails}/>
            </div>
        )}
    }

const mapStateToProps = state => {
    return {
        charactersList: state.characters,
        page: state.nextPage,
        hasNextPage: state.hasNext,
        hasBuffer: state.hasBuffer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFirstCharacters: () => dispatch(actions.fetchFirstCharacters()),
        onFetchNextCharacters: (page, hasBuffer) => dispatch(actions.fetchNextCharacters(page, hasBuffer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);