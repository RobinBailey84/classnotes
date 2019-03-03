import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar.js';
import PirateList from '../components/pirates/PirateList';
import Request from '../helpers/request';

class MainContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      pirates: [],
      ships:[],
      raids: []
    }
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

  render(){
    return (
      <div>
      <Router>
      <React.Fragment>
      <NavBar/>
      <Switch>
      {/* GET ALL PIRATES */}
      <Route exact path="/pirates" render={(props) =>{
        return <PirateList pirates={this.state.pirates}/>
      }}/>

      </Switch>


      </React.Fragment>
      </Router>
      </div>
    )
  }
}

export default MainContainer;
