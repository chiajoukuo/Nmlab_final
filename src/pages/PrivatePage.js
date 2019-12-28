import React from 'react';
import HomePage from '../components/HomePage'
import BoughtImages from '../components/BoughtImages'
import Posting from "../../build/contracts/Posting.json"
import User from "../../build/contracts/User.json"

class PrivatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'username',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s'
    };
  }
  UNSAFE_componentWillMount = async () => {
    // try {
    //     const web3 = this.props.web3
    //     const accounts = await web3.eth.getAccounts();
    //     const networkId = await web3.eth.net.getId();
    //     const PostingdeployedNetwork = Posting.networks[networkId];
    //     const UserdeployedNetwork = User.networks[networkId];
    //     const instance = new web3.eth.Contract(
    //         Posting.abi,
    //         PostingdeployedNetwork && PostingdeployedNetwork.address,
    //     );
    //     const instance1 = new web3.eth.Contract(
    //         User.abi,
    //         UserdeployedNetwork && UserdeployedNetwork.address,
    //     );
    //     this.setState({ 
    //         web3, accounts, 
    //         posting: instance, 
    //         user: instance1
    //     });

    // } catch (error) {
    //     alert(
    //         `Failed to load web3, accounts, or contract. Check console for details.`,
    //     );
    //     console.error(error);
    // }
    var user = await await this.props.user.methods.getAuthorByAddr(this.props.accounts[0]).call()
    console.log(user)
    this.setState({
      userName : user[2],
      avatar:user[1],
    })
  };  
  render() {
    return (
      <div>
          <div className='between'></div>
          <div className = 'profile_header'>
            <div className='profile_avatar'>
              <img src={this.state.avatar} alt=""/>
            </div>
            <div>
              <h1 className='profile_author'>{this.state.userName}</h1>
            </div>
          </div>
          {/* <div className='between'></div> */}
          <h1 className='profile_author'>My images</h1>
          <div className='between'></div>
          <HomePage></HomePage>
          <div className='between'></div>
          <div className='between'></div>
          <div className='between'></div>

          <h1 className='profile_author'>My posts</h1>
          <div className='between'></div>
          <BoughtImages></BoughtImages>
          <div className='between'></div>
          <div className='between'></div>
          <div className='between'></div>

          <h1 className='profile_author'>images I bought</h1>
          <div className='between'></div>
          <BoughtImages></BoughtImages>
          <div className='between'></div>
      </div>
    );
  }
}
export default PrivatePage;