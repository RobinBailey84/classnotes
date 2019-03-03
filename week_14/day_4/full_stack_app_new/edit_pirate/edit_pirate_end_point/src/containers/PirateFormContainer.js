import React, {Component} from 'react';
import Request from '../helpers/request';
import PirateForm from '../components/pirates/PirateForm'

class PirateFormContainer extends Component {
  constructor(props){
    super(props);
    this.handlePiratePost = this.handlePiratePost.bind(this);
  }

  handlePiratePost(pirate){
    const request = new Request();
    request.post('/api/pirates', pirate).then(() => {
      window.location = '/pirates'
    })
  }

  render(){

    return <PirateForm ships = {this.props.ships} handlePiratePost= {this.handlePiratePost} />

  }
}

export default PirateFormContainer;
