import React from 'react';
//modify
import getWeb3 from "../utils/getWeb3";
import Posting from "../../build/contracts/Posting.json"
import User from "../../build/contracts/User.json"

class BlockChainTest extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {texting: 'Hello world', balance: 0};
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
      const instance1 = new web3.eth.Contract(
        User.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ web3, accounts, contract: instance, User: instance1 });
      this.setState({balance: await this.state.contract.methods.getBalance().call()});
      await this.state.contract.methods.createPost(12, "I love Hannah #H&J#yo", "12319696969696969696969696969696969696").send({ from: this.state.accounts[0]});
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
   console.log(this.state.accounts[0]);
   this.setState({texting: await this.state.contract.methods.SayHello().call()});
  }

  handleAddUser = async(event) =>{
    await this.state.contract.methods.addUser(0,0,"0xa916a78C4827b51a179E133634B45e346490c408").send({ from: this.state.accounts[0], value : this.state.web3.utils.toWei("1", "ether")});
    this.setState({balance: await this.state.contract.methods.getBalance().call()});
  }

  
  handlePost = async (event) =>{
    await this.state.contract.methods.createPost(12, "I love Hannah #H&J#yo", "12319696969696969696969696969696969696").send({ from: this.state.accounts[0]});
  }

  handleDonate = async (event) =>{
    await this.state.contract.methods.donate().send({ from: this.state.accounts[0], value : this.state.web3.utils.toWei("1", "ether")});
    console.log(await this.state.contract.methods.getBalance.call());
    this.setState({balance: await this.state.contract.methods.getBalance().call()});
  }

  handleLike = async (event) =>{
    await this.state.contract.methods.toggleLikes(0, 0).send({ from: this.state.accounts[0]});
    this.setState({balance: await this.state.contract.methods.getBalance().call()});
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
        <button onClick={this.handleDonate}>Donate 1 Ether!</button>
        <button onClick={this.handlePost}>CreatePost!</button>
        <button onClick={this.handleAddUser}>AddUser!</button>
        <h2>{this.state.balance}</h2>
        <button onClick={this.handleLike}>CLickLike!</button>
      </div>
    );
  }
}

export default BlockChainTest;
