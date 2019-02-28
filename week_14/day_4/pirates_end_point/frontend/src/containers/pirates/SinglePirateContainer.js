import React, {Component} from 'react';
import SinglePirate from '../../components/pirates/SinglePirate.js';

import Request from '../../helpers/request.js';

class SinglePirateContainer extends Component {
  constructor(props){
    super(props);
    this.state = {pirate: null}
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    const request = new Request();
    const url = '/api/pirates/' + this.props.id + '?projection=embedShip';
    request.get(url).then((data) => {
      this.setState({pirate: data})
    })
  }

  handleDelete(id){
    const request = new Request();
    const url = '/api/pirates/' + id;
    request.delete(url).then(() => {
      window.location = "/pirates";
    });
  }

    render(){
    return (
       <SinglePirate pirate = {this.state.pirate} handleDelete = {this.handleDelete} />
    )
  }
}

export default SinglePirateContainer;
