import React, {Component, Fragment} from 'react';
import axios from './../../axios';
import {connect} from 'react-redux';
import './CharacterDetails.css';
import lightsaber from './../../assets/lightsaber.png';
import * as actions from './../../store/actions';
import Spinner from './../UI/Spinner/Spinner';
import Button from './../UI/Button/Button';

class CharacterDetails extends Component {

    state = {
        isCharacterLoaded: false,
        characterData: '',
        redirect: null
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get('people/'+id)
        .then(res => {
            const fetchedData = res;
            this.setState({
                characterData: fetchedData.data,
                isCharacterLoaded: true
            })
        })
        .catch(err => {
            console.log(err);
        })

        if(this.props.films === ''){
            this.props.onFetchFilms();
        }
    }

    handleBackToList = () => {
        console.log("in!before");
        this.props.history.goBack();
        console.log("in!after");
    }

    render(){
        console.log(this.props);
        let filmList = <Spinner/>
        if(this.props.films !== '' && this.state.isCharacterLoaded){
            const filmMap = new Map();
            for(let film of this.props.films){
                filmMap.set(film.url, film.title);
            }

            filmList = this.state.characterData.films.map(film => 
                <li key={filmMap.get(film)}>{filmMap.get(film)}</li>
            )
        }

        return(
            <Fragment>
                <div className="CharacterDetails">
                    <h1>{this.state.characterData.name}</h1>
                    <b>gender: </b> {this.state.characterData.gender}<br/>
                    <b>birth year: </b> {this.state.characterData.birth_year}<br/>
                    <b>height: </b> {this.state.characterData.height}<br/><br/>
                    <img src={lightsaber} alt="lightsaber"/>
                    <h3><b>starred at: </b></h3>
                    {filmList}
                </div>
                <Button clicked={this.handleBackToList}>
                    Back to list
                </Button>
            </Fragment>
            

        );
    }
}

const mapStateToProps = state => {
    return {
        films: state.films
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFilms: () => dispatch(actions.fetchFilms())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetails);