import React,{Component} from 'react';
import Post from './component/Post';
import './component/IG_style.css'

class HomePage_IG extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts_id : [
                0,1,2,3,4
            ]
        };
    }
    render(){
        return(
            <div className='homepage_ig'>
                {this.state.posts_id.map(
                    post_id_element=>(
                        <>
                            <div className='between'></div>
                            <Post 
                                post_id={post_id_element}
                            />
                            <div className='between'></div>
                        </>
                    )
                )}
            </div>
        );
    }
    
}

export default HomePage_IG;
