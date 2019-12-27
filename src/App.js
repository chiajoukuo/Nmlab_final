import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage';
import PicturePage from './pages/IG/PicturePage';
import {Switch, Route} from "react-router-dom";
import "./css/grid_style.css";
import MyNavbar from './components/MyNavbar';
import Top from './components/top';
import PrivatePage from './pages/PrivatePage'
import PublicPage from './pages/PublicPage'
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import SettingPage from './pages/SettingPage';
import NewPostPage from './pages/NewPostPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage_IG from './pages/IG/HomePage_IG'

function App() {
  return (
    <div className='bg'>
      <BrowserRouter>
        <div className='navbar_div'>
          <MyNavbar></MyNavbar>
        </div>
        
        {/* <Top></Top> */}
        <div className="App">
          
          <Switch>
            {/* <Route exact path='/' component={Header}>
            </Route> */}
            <Route exact path='/' component={SettingPage}></Route>
            <Route exact path='/home' component={HomePage_IG}></Route>
            <Route exact path='/test' component={PicturePage}></Route>
            <Route path="/posts/:id?" component={PicturePage} />
            <Route exact path='/profile' component={PrivatePage}></Route>
            <Route exact path='/public_profile' component={PublicPage}></Route>
            {/* <Route exact path='/login' component={LoginPage}></Route> */}
            <Route exact path='/upload' component={UploadPage}></Route>
            <Route exact path='/new_post' component={NewPostPage}></Route>

            
          </Switch>
          
          {/* <div classNAme="content">
            <Switch>
              <Route exact path='/home' component={HomePage}>
              </Route>
              <Route exact path='/test' component={TestPage}>
              </Route>
            </Switch>
          </div> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
