import React, {Component, Fragment} from 'react';
import axios from './../../axios';
import {connect} from 'react-redux';
import './CharacterDetails.css';
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
        this.props.history.goBack();
    }

    render(){
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
                    <div className="Grid">
                        <div className="Column">
                            <h3>About {this.state.characterData.name}: </h3>
                            <b>gender: </b> {this.state.characterData.gender}<br/>
                            <b>birth year: </b> {this.state.characterData.birth_year}<br/>
                            <b>height: </b> {this.state.characterData.height}<br/><br/>
                        </div>
                        <div className="Column">
                            <h3>starred at: </h3>
                            {filmList}
                        </div>
                    </div>
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

// const mapDispatchToProps = dispatch => {
//     return {
//         onFetchFilms: () => dispatch(actions.fetchFilms())
//     }
// }

export default connect(mapStateToProps)(CharacterDetails);