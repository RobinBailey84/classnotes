import React, {Component} from 'react';
import Request from '../helpers/request';
import PirateEditForm from '../components/pirates/PirateEditForm'

class PirateEditFormContainer extends Component {
  constructor(props){
    super(props);
    this.handlePirateUpdate = this.handlePirateUpdate.bind(this);
  }

  handlePirateUpdate(pirate){
    const request = new Request();
    request.put('/api/pirates/' + this.props.pirate.id, pirate).then(() => {
      window.location = '/pirates/' + this.props.pirate.id
    })
  }

  render(){

    return <PirateEditForm ships = {this.props.ships} pirate = {this.props.pirate} raids = {this.props.raids} handlePirateUpdate= {this.handlePirateUpdate} />

  }
}

export default PirateEditFormContainer;
