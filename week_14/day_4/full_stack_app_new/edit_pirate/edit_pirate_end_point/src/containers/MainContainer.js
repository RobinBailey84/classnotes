import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar.js';
import PirateList from '../components/pirates/PirateList';
import ShipList from '../components/ships/ShipList';
import RaidList from '../components/raids/RaidList';
import PirateDetails from '../components/pirates/PirateDetails';
import PirateFormContainer from './PirateFormContainer'
import PirateEditFormContainer from './PirateEditFormContainer'
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

  componentDidMount(){
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
    });
  }

  findPirateById(id){
    const pirate = this.state.pirates.find((pirate) => {
      return pirate.id === parseInt(id);
    });
    return pirate;
  }

  handleDelete(id){
    const request = new Request()
    request.delete("/api/pirates/" + id).then(() => {
      window.location = "/pirates"
    })
  }

  render(){
    return (
      <div>
      <Router>
      <React.Fragment>
      <NavBar/>
      <Switch>
      {/* GET ALL PIRATES */}
      <Route exact path="/pirates" render={(props) =>{
        return <PirateList pirates={this.state.pirates} onPirateSelect={this.findPirateById}/>
      }}/>

      {/* POST A PIRATE */}
      <Route exact path = '/pirates/new' render={(props) =>{
        return <PirateFormContainer ships={this.state.ships} />
      }}/>

      {/* EDIT ONE PIRATE */}
      <Route exact path="/pirates/edit/:id" render={(props) =>{
        const pirate = this.findPirateById(props.match.params.id);
        return <PirateEditFormContainer pirate={pirate} ships={this.state.ships} raids = {this.state.raids}/>
      }}/>


      {/* GET ONE PIRATE */}
      <Route exact path="/pirates/:id" render={(props) =>{
        const pirate = this.findPirateById(props.match.params.id);
        return <PirateDetails pirate={pirate} onDelete={this.handleDelete}/>
      }}/>



      {/* GET ALL SHIPS */}
      <Route exact path="/ships" render={(props) => <ShipList ships={this.state.ships}/>}/>


      {/* GET ALL RAIDS */}
      <Route exact path="/raids" render={(props) => <RaidList raids={this.state.raids}/>}/>
      </Switch>


      </React.Fragment>
      </Router>
      </div>
    )
  }
}

export default MainContainer;
