import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import PicturePage from './pages/IG/PicturePage';
import {Switch, Route} from "react-router-dom";
import "./css/grid_style.css";
import MyNavbar from './components/MyNavbar';
import PrivatePage from './pages/PrivatePage'
import PublicPage from './pages/PublicPage'
import UploadPage from './pages/UploadPage';
import SettingPage from './pages/SettingPage';
import NewPostPage from './pages/NewPostPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePageIG from './pages/IG/HomePage_IG'
import getWeb3 from "./utils/getWeb3";
import Posting from "../build/contracts/Posting.json"
import User from "../build/contracts/User.json"

class App extends React.Component {
  constructor() {
    super();
    this.state={
      OK:0,
      web3:null
    }
  }
  UNSAFE_componentWillMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const PostingdeployedNetwork = Posting.networks[networkId];
      const UserdeployedNetwork = User.networks[networkId];
      const instance = new web3.eth.Contract(
          Posting.abi,
          PostingdeployedNetwork && PostingdeployedNetwork.address,
      );
      const instance1 = new web3.eth.Contract(
          User.abi,
          UserdeployedNetwork && UserdeployedNetwork.address,
      );
      this.setState({ 
          web3, accounts, 
          posting: instance, 
          user: instance1,
          OK:1
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render(){
    if(this.state.OK===1){
      return (
        <div className='bg'>
          <BrowserRouter>
            <div className='navbar_div'>
              <MyNavbar></MyNavbar>
            </div>
            <div className="App">
              <Switch>
                <Route exact path='/' render={(props) => <SettingPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/home' render={(props) => <HomePageIG {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/test' component={PicturePage} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>
                <Route path="/posts/:id?" render={(props) => <PicturePage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/upload' render={(props) => <UploadPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />

                <Route exact path='/profile' render={(props) => <PrivatePage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/public_profile/:addr?' render={(props) => <PublicPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
                <Route exact path='/new_post' render={(props) => <NewPostPage {...props} web3={this.state.web3} posting={this.state.posting} user={this.state.user} accounts={this.state.accounts}/>} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      );
    }
    else{
      return(
        <div></div>
      )
    }
  }
}

export default App;
