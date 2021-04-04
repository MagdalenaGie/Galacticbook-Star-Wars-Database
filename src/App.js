import './App.css';
// import Layout from './hoc/Layout/Layout';
import {Route, Switch} from 'react-router-dom';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import List from './components/List/List';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route patch="/" exact component={List} />
        <Route patch="/characters/:id" component={CharacterDetails}/>
      </Switch>
    </div>
  );
}

export default App;
