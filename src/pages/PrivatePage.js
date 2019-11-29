import React from 'react';
import HomePage from './HomePage'

class PrivatePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {userName: props.userName, wallet: this.getWallet()};
    }
  
    //getWallet
    getWallet(){
        return 666
    }
  
    render() {
      return (
        <div>
            <h1>user</h1>
            <img src={require('./personalPic.jpg')} height="100" width="100" alt=""/>
            <h3>Wallet: {this.state.wallet}</h3>
            <br></br>
            <HomePage></HomePage>
        </div>
      );
    }
  }
export default PrivatePage;