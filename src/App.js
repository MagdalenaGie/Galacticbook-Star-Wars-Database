import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import MainPage from './components/MainPage/MainPage';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render(){
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/characters/:id" component={CharacterDetails}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
