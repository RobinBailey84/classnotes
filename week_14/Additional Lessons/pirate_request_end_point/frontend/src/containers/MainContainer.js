import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar.js';
import PirateList from '../components/pirates/PirateList';
import ShipList from '../components/ships/ShipList';
import RaidList from '../components/raids/RaidList';
import DetailedPirate from '../components/pirates/DetailedPirate';
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

    this.handlePirateSelect = this.handlePirateSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    let request = new Request()
    request.get('/api/pirates').then((data) => {
      this.setState({pirates: data._embedded.pirates})
    }).then(() => {
      request.get('/api/ships').then((data) => {
        this.setState({ships: data._embedded.ships})
      })
    }).then(() => {
      request.get('/api/raids').then((data) => {
        this.setState({raids: data._embedded.raids})
      })
    })
  }

  handlePirateSelect(id){
    const pirate = this.state.pirates.find((pirate) => {
      return pirate.id === parseInt(id);
    });
    return pirate;
  }

  handleDelete(id){
    let request = new Request()
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
        return <PirateList pirates={this.state.pirates} onPirateSelect={this.handlePirateSelect}/>
      }}/>

      {/* POST A PIRATE */}
      <Route exact path = '/pirates/new' render={(props) =>{
        return <PirateFormContainer ships={this.state.ships} />
      }}/>

      {/* EDIT ONE PIRATE */}
      <Route exact path="/pirates/edit/:id" render={(props) =>{
        const pirate = this.handlePirateSelect(props.match.params.id);
        return <PirateEditFormContainer pirate={pirate} ships={this.state.ships} raids = {this.state.raids}/>
      }}/>


      {/* GET ONE PIRATE */}
      <Route exact path="/pirates/:id" render={(props) =>{
        const pirate = this.handlePirateSelect(props.match.params.id);
        return <DetailedPirate pirate={pirate} onPirateSelect={this.handlePirateSelect} onDelete={this.handleDelete}/>
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
