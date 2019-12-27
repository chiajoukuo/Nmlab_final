import HomePage from '../components/HomePage'
import React from 'react';
import './IG/component/IG_style.css'
import '../css/style.css'


class PublicPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userName: 'username',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s'
      };
    }
  
  
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
            <div className='between'></div>
            <HomePage></HomePage>
            <div className='between'></div>
        </div>
      );
    }
  }
export default PublicPage;