import React,{Component} from 'react';
import PostComment from './PostComment'
import './IG_style.css';
import {Link } from "react-router-dom";
import PostMessage from './PostMessage';



class PostComments extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comments:[
                0,1,2,3,4
            ]
        };
    }
    render(){
        return(
            <div className='post_comments'>
                {this.state.comments.map(
                    comment_id=>(
                        <>
                            <PostComment comment_id={comment_id}/>
                        </>
                    )
                )}
                <PostMessage />
            </div>
        );
    }
    
}

export default PostComments;