import React from 'react';
//modify
import getWeb3 from "../utils/getWeb3";
import Posting from "../../build/contracts/Posting.json"

class BlockChainTest extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {texting: 'Hello world'};
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Posting.networks[networkId];
      const instance = new web3.eth.Contract(
        Posting.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log('Start');
    await this.state.contract.methods.SetMessage(data.get('username')).send({ from: this.state.accounts[0]});
    console.log('after set');
    console.log(await this.state.contract.methods.SayHello().call());
    console.log('after sayHello');
  }


  handleRegister= async (event) =>{
   this.setState({texting: await this.state.contract.methods.SayHello().call()});
  }


  render() {
    return (
      <div>
        <h1>Please Send Data!</h1>
        <form onSubmit={this.handleSubmit}>
          
          <label htmlFor="Input String">Enter Arbitrary String:</label>
          <input id="username" name="username" type="text" />
          <input type="submit" value="Send!"/>
        </form>
        <h2>{this.state.texting}</h2>
        <button onClick={this.handleRegister}>Update!</button>
      </div>
    );
  }
}

export default BlockChainTest;
