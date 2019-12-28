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
      this.setState({
        web3:web3
      })
      this.setState({OK:1})
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
                <Route exact path='/' render={(props) => <SettingPage {...props} web3={this.state.web3}/>} />
                <Route exact path='/home' render={(props) => <HomePageIG {...props} web3={this.state.web3}/>} />
                <Route exact path='/test' component={PicturePage}/>
                <Route path="/posts/:id?" render={(props) => <PicturePage {...props} web3={this.state.web3}/>} />
                <Route exact path='/upload' render={(props) => <UploadPage {...props} web3={this.state.web3}/>} />

                <Route exact path='/profile' component={PrivatePage}></Route>
                <Route exact path='/public_profile/:id?' component={PublicPage}></Route>
                <Route exact path='/new_post' component={NewPostPage}></Route>
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
