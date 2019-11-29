import React,{Component} from 'react';
import PostHead from './PostHead';
import PostImage from './PostImage';
import PostContent from './PostContent';
import PostButton from './PostButton';
import './IG_style.css';

class Post extends Component{
    constructor(props) {
        super(props);
        this.post_id = this.props.post_id;
        this.state = {
            rrr:0
        };
    }
    render(){
        return(
            <article className="Post" ref="Post">
                {/* <Route exact path='/test' component={PicturePage}></Route> */}
                <PostHead/>
                <PostImage/>
                <PostButton/>
                <PostContent/>
            </article>
        );
    }
    
}

export default Post;