import React from 'react';
import BoughtImages from '../components/BoughtImages'
import StackGrid, { transitions, easings } from "react-stack-grid";
import {Link } from "react-router-dom";
import '../css/grid_style.css'
import '../css/normalize.css'

const transition = transitions.scaleDown;

class PrivatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'username',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzF2pFf814zRqNtePwN2Pr-YkNC3ZckLF09qpzaL2ZpXioAB_M&s',
      photos: []
    };
  }
  UNSAFE_componentWillMount = async () => {
    var user = await await this.props.user.methods.getAuthorByAddr(this.props.accounts[0]).call()
    var post_ids = await this.props.posting.methods.getPostsByAddr(this.props.accounts[0]).call()
    var photos = []
    for(var idx=0; idx<post_ids.length; idx++){
      var pid = post_ids[idx]
      var post = await this.props.posting.methods.getPostByID(pid).call()
      //console.log(post[2])
      photos.push({src:post[6], text:post[2], post_id:pid})
    }
    this.setState({
      userName : user[2],
      avatar:user[1],
      photos:photos
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
          <StackGrid
              monitorImagesLoaded
              columnWidth={300}
              duration={600}
              gutterWidth={15}
              gutterHeight={15}
              easing={easings.cubicOut}
              appearDelay={60}
              appear={transition.appear}
              appeared={transition.appeared}
              enter={transition.enter}
              entered={transition.entered}
              leaved={transition.leaved}
          >
              {this.state.photos.map(
                  element => (
                      <figure key={element.src} className="image">
                          <Link to={"/posts/"+element.post_id}>
                              <img src={element.src} alt={element.text}/>  
                              {/* <figcaption>{element.text}</figcaption> */}
                          </Link>
                      </figure>
                  )
              )}
          </StackGrid>
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