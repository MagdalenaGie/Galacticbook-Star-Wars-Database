import React, {Component, Fragment} from 'react';
import ListElement from './ListElement/ListElement';
import Spinner from '../../UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from './../../../store/actions';
import './List.css';

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
        if (Math.abs(scroller.scrollHeight - scroller.scrollTop) - scroller.clientHeight < 3 && !this.props.isLoading ) {
            this.props.onFetchNextCharacters(this.props.page, this.props.hasBuffer);
        }
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
                        clicked = {() => this.props.onClickCharacter(char.url.replace(/[^0-9]/g,''))}
                    />)
                    )
        }

        return(
            <Fragment>
                <div className="InfiniteScroll" ref={this.scrollerRef} onScroll={this.handleScroll}>
                    {listToDisplay}
                    {this.props.isLoading ? <Spinner/> : null }
                    {this.props.hasNextPage ? null : <p>End of the list you have reached, my young padawan...</p>}
                </div>
                <br/>
                {this.props.hasNextPage ? <p>Scroll down you should, young padawan</p> : null}
            </Fragment>
                
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