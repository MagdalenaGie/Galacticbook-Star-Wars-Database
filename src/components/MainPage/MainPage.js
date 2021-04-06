import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../store/actions';
import List from './List/List';
import BasicList from './List/BasicList';
import Button from '../UI/Button/Button';
import CharacterDetails from './../CharacterDetails/CharacterDetails';
import { Route } from "react-router-dom";
import './MainPage.css';

class MainPage extends Component {

    state = { 
        basic: true
    }

    componentDidMount(){
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
        this.props.onSetSort(event.target.value)
    }

    onChangeFilterFilm = (event) => {
        this.props.onSetFilterFilm(event.target.value)
    }

    onChangeFilterGender = (event) => {
        this.props.onSetFilterGender(event.target.value)
    }

    onLoadMore = () => {
        this.props.onFetchNextCharacters(this.props.page, this.props.hasBuffer);
    }

    onSwitchList = () => {
        let newView = !this.state.basic;
        this.setState({basic:newView});
    }

    render(){
        let filmList = null;
        if(this.props.films !== ''){
            filmList = this.props.films.map(film => 
                <option value={film.url} key={film.url} > {film.title} </option>   
            )
        }

        return(
            <div className="MainPage">
                <Button clicked={this.onSwitchList}>{this.state.basic ? "Enable" : "Disable"}</Button>
                <select id="selectSort" onChange={this.onChangeSort} defaultValue="default" disabled={this.state.basic}> 
                    <option value="alphAsc" key="alphasc" > By name ascending </option>   
                    <option value="alphDesc" key="alphdesc"> By name descending </option> 
                    <option value="default" key="default" disabled hidden> Sort by </option>
                </select>
                <select id="selectSort" onChange={this.onChangeFilterFilm} defaultValue="default" disabled={this.state.basic} > 
                    {filmList}
                    <option value="none" key="none"> Show all</option>
                    <option value="default" key="default" disabled hidden> Filter by film</option>
                </select>
                <select id="selectSort" onChange={this.onChangeFilterGender} defaultValue="default" disabled={this.state.basic}> 
                    <option value="female" key="female"> female </option>
                    <option value="male" key="male"> male </option>
                    <option value="n/a" key="n/a"> n/a </option>
                    <option value="none" key="none"> Show all </option>
                    <option value="default" key="default" disabled hidden> Filter by gender</option>
                </select>
                <div>
                    {
                        this.state.basic ? 
                        <BasicList
                            onClickCharacter={this.onClickCharacter}
                        />:
                        <List
                            filterFilm={this.props.filterFilm}
                            filterGender={this.props.filterGender}
                            sort={this.props.sort} 
                            onClickCharacter={this.onClickCharacter}
                        />
                    }
                </div>
                <Route path={this.props.match.url + "/characters/:id"} component={CharacterDetails}/>
            </div>
        )}
    }

const mapStateToProps = state => {
    return {
        films: state.films,
        filterFilm: state.filterFilm,
        filterGender: state.filterGender,
        sort: state.sort
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFilms: () => dispatch(actions.fetchFilms()),
        onSetFilterFilm: (filter) => dispatch(actions.setFilterFilm(filter)),
        onSetFilterGender: (filter) => dispatch(actions.setFilterGender(filter)),
        onSetSort: (sort) => dispatch(actions.setSort(sort))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);