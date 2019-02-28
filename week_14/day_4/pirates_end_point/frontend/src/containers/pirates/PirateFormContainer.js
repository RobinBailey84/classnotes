import React, {Component} from 'react';
import Request from '../../helpers/request';

import PirateForm from '../../components/pirates/PirateForm';

class PirateFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {ships: []}
    this.handlePiratePost = this.handlePiratePost.bind(this);
  }


  componentDidMount(){
    const request = new Request();
    const url = "/api/ships";
    request.get(url).then((data) => {
      this.setState({ships: data._embedded.ships})
    });
  }

  handlePiratePost(pirate){
    const request = new Request();
    request.post('/api/pirates', pirate).then(() => {
      window.location = '/pirates';
    });
  }

  render(){
    return <PirateForm ships={this.state.ships} onSubmit={this.handlePiratePost} />
  }
}

export default PirateFormContainer;
