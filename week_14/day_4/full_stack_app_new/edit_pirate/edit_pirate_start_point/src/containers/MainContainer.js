import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar.js';
import PirateList from '../components/pirates/PirateList';
import PirateDetails from '../components/pirates/PirateDetails'
import PirateFormContainer from './pirates/PirateFormContainer';
import Request from '../helpers/request';


class MainContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      pirates: [],
      ships:[],
      raids: []
    }

    this.findPirateById = this.findPirateById.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){ // ADDED
    const request = new Request()

    const promise1 = request.get('/api/pirates');

    const promise2 = request.get('/api/ships');

    const promise3 = request.get('/api/raids');

    const promises = [promise1, promise2, promise3];

    Promise.all(promises).then((data) => {
      this.setState({
        pirates: data[0]._embedded.pirates,
        ships: data[1]._embedded.ships,
        raids: data[2]._embedded.raids})
      })
    }

    findPirateById(id){
      const pirate = this.state.pirates.find((pirate) => {
        return pirate.id === parseInt(id);
      });
      return pirate;
    }

    handleDelete(id){
      const request = new Request();
      const url = '/api/pirates/' + id;
      request.delete(url).then(() => {
        window.location = '/pirates';
      });
    }

    render(){
      return (
        <div>
        <Router>
        <React.Fragment>
        <NavBar/>
        <Switch>
        <Route exact path="/pirates" render={(props) =>{
          return <PirateList pirates={this.state.pirates}/>
        }}/>

        <Route exact path = '/pirates/new' render={(props) =>{
          return <PirateFormContainer ships = {this.state.ships}/>
        }}/>

        <Route exact path="/pirates/:id" render={(props) =>{
          const pirate = this.findPirateById(props.match.params.id);
          return <PirateDetails pirate={pirate} onDelete={this.handleDelete}/>
        }}/>

        </Switch>


        </React.Fragment>
        </Router>
        </div>
      )
    }
  }

  export default MainContainer;
