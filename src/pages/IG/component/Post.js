import React,{Component} from 'react';
import PostHead from './PostHead';
import PostImage from './PostImage';
import PostContent from './PostContent';
import PostButton from './PostButton';
import './IG_style.css';
import { thisExpression } from '@babel/types';

class Post extends Component{
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.post_id,
            authorID : this.props.authorID,
            author : this.props.author,
            postInfo : this.props.postInfo,
            like : this.props.like,
            likeNum : this.props.likeNum,
            msgNum : this.props.msgNum,
            userNum : this.props.userNum,
            pic : this.props.pic
        };
    }
    render(){
        //console.log(this.state.like)
        return(
            <article className="Post" ref="Post">
                {/* <Route exact path='/test' component={PicturePage}></Route> */}
                <PostHead authorID = {this.state.authorID} author ={this.state.author} />
                <PostImage pic = {this.state.pic} postID = {this.state.post_id}/>
                <PostButton like = {this.state.like} likeNum = {this.state.likeNum} msgNum = {this.state.msgNum} userNum = {this.state.userNum} postID = {this.state.post_id} web3={this.props.web3}/>
                <PostContent content = {this.state.postInfo}/>
            </article>
        );
    }
    
}

export default Post;