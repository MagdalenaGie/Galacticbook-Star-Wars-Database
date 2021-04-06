import React, {Component} from 'react';
import ListElement from './ListElement/ListElement';
import Spinner from '../../UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from './../../../store/actions';
import './List.css';

//I just want to say, that i'm aware that when next five elements are added, 
//the whole list re-renders and scrolls to the top - I agree that it may not seem like a good UI idea,
//I don't like that and probably the user also would not like that,
//but I decided to leave it like that becouse when there are filters or sorting added, 
//then the new five elements not necessarily will be at the bottom - they may be even at the top, so I decided
//that it makes sense to go back to the top instead of staying at the almost bottom of the list level, just for no reason as 
//the new elements may not show up in there

class List extends Component {

    constructor(props){
        super(props);
        this.scrollerRef = React.createRef();
    }

    componentDidMount(){
        if(this.props.charactersList.length === 0){
            this.props.onFetchFirstCharacters();
        }
    }

    handleScroll = () => {
        const scroller = this.scrollerRef.current;
        console.log(Math.abs(scroller.scrollHeight - scroller.scrollTop), scroller.clientHeight)
        if (Math.abs(scroller.scrollHeight - scroller.scrollTop) - scroller.clientHeight < 3 && !this.props.isLoading ) {
            this.props.onFetchNextCharacters(this.props.page, this.props.hasBuffer);
        }
      }

    sortCharacters = () => {
        if(this.props.sort ==='alphAsc'){
            this.props.charactersList.sort(this.sortCharactersByName);
        }else if(this.props.sort ==='alphDesc'){
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

    onCheckFilter = (char) => {
        let bool = true;
        if(this.props.filterGender !== 'none'){
            bool = (char.gender === this.props.filterGender) ? true : false;
        }
        if(this.props.filterFilm !== 'none' && bool){
            bool = false;
            for(let film of char.films){
                if(film === this.props.filterFilm){
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
                                clicked = {() => this.props.onClickCharacter(char.url.replace(/[^0-9]/g,''))}
                            />)
                    }
                    return null;
                })
            }
        }

        return(
                <div className="InfiniteScroll" ref={this.scrollerRef} onScroll={this.handleScroll}>
                    {listToDisplay}
                    {this.props.hasNextPage ? null : <p>End of the list you have reached, my young padawan...</p>}
                </div>
        )}
    }

    const mapStateToProps = state => {
        return {
            charactersList: state.characters,
            page: state.nextPage,
            hasNextPage: state.hasNext,
            hasBuffer: state.hasBuffer,
            isLoading: state.isLoading
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