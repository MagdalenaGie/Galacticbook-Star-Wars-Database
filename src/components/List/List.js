import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../store/actions';
import ListElement from './ListElement/ListElement';
import CharacterDetails from './../CharacterDetails/CharacterDetails';
import Spinner from './../UI/Spinner/Spinner';
import Button from './../UI/Button/Button';
import { Route } from "react-router-dom";
import './List.css';

class List extends Component {

    state = {
        sort: '',
        filterFilm: 'none',
        filterGender: 'none'
    }

    componentDidMount(){
        this.props.onFetchFirstCharacters();
        this.props.onFetchFilms();
    }

    onClickCharacter = (id) => {
        this.props.history.push('/characters/' + id);
    }

    sortCharacters = () => {
        if(this.state.sort ==='alphAsc'){
            this.props.charactersList.sort(this.sortCharactersByName);
        }else if(this.state.sort ==='alphDesc'){
            this.props.charactersList.sort(this.sortCharactersByNameReverse);
        }
    }

    sortCharactersByName(char1, char2){
        if(char1.name < char2.name){
            return -1;
        }else if(char1.name > char2.name){
            return 1;
        }else{
            return 0;
        }
    }

    sortCharactersByNameReverse(char1, char2){
        if(char1.name < char2.name){
            return 1;
        }else if(char1.name > char2.name){
            return -1;
        }else{
            return 0;
        }
    }

    onChangeSort = (event) => {
        this.setState({sort: event.target.value});
        this.sortCharacters();
    }

    onChangeFilterFilm = (event) => {
        this.setState({filterFilm: event.target.value});
    }

    onChangeFilterGender = (event) => {
        this.setState({filterGender: event.target.value});
    }

    onLoadMore = () => {
        this.props.onFetchNextCharacters(this.props.page, this.props.hasBuffer);
    }

    onCheckFilter = (char) => {
        let bool = true;
        if(this.state.filterGender !== 'none'){
            bool = (char.gender === this.state.filterGender) ? true : false;
        }
        if(this.state.filterFilm !== 'none' && bool){
            bool = false;
            for(let film of char.films){
                if(film === this.state.filterFilm){
                    bool = true;
                }
            }
        }
        return bool;
        
    }

    render(){
        let listToDisplay = <Spinner/>
        if(this.props.charactersList.length > 0){
            if(this.props.isLoading){
                listToDisplay = <Spinner/>
            }else{
                this.sortCharacters();
                listToDisplay = this.props.charactersList.map(char => {
                    if(this.onCheckFilter(char)){
                        return(
                            <ListElement 
                                name={char.name} 
                                key={char.url} 
                                gender={char.gender}
                                by={char.birth_year}
                                clicked = {() => this.onClickCharacter(this.props.charactersList.indexOf(char)+1)}
                            />)
                    }
                    return null;
                })
            }
        }

        let filmList = null;
        if(this.props.films !== ''){
            filmList = this.props.films.map(film => 
                <option value={film.url} key={film.url} > {film.title} </option>   
            )
        }

        return(
            <div className="List">
                <select id="selectSort" onChange={this.onChangeSort} defaultValue="default"> 
                    <option value="alphAsc" key="alphasc" > By name ascending </option>   
                    <option value="alphDesc" key="alphdesc"> By name descending </option> 
                    <option value="default" key="default" disabled hidden> Sort by </option>
                </select>
                <select id="selectSort" onChange={this.onChangeFilterFilm} defaultValue="default"> 
                    {filmList}
                    <option value="none" key="none"> Show all</option>
                    <option value="default" key="default" disabled hidden> Filter by film</option>
                </select>
                <select id="selectSort" onChange={this.onChangeFilterGender} defaultValue="default"> 
                    <option value="female" key="female"> female </option>
                    <option value="male" key="male"> male </option>
                    <option value="n/a" key="n/a"> n/a </option>
                    <option value="none" key="none"> Show all </option>
                    <option value="default" key="default" disabled hidden> Filter by gender</option>
                </select>
                <div className="InfiniteScroll">
                    {listToDisplay}
                </div>
                
                {this.props.hasNextPage ? <Button clicked={this.onLoadMore}>Load next 5</Button> : null}
                <Route path={this.props.match.url + "/characters/:id"} component={CharacterDetails}/>
            </div>
        )}
    }

const mapStateToProps = state => {
    return {
        charactersList: state.characters,
        page: state.nextPage,
        hasNextPage: state.hasNext,
        hasBuffer: state.hasBuffer,
        isLoading: state.isLoading,
        films: state.films
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFirstCharacters: () => dispatch(actions.fetchFirstCharacters()),
        onFetchNextCharacters: (page, hasBuffer) => dispatch(actions.fetchNextCharacters(page, hasBuffer)),
        onFetchFilms: () => dispatch(actions.fetchFilms())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);