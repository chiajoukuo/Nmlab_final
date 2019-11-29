import React,{Component} from 'react';
import './IG_style.css';
import {Link } from "react-router-dom";


class PostImage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            src:'http://s07.tku.edu.tw/~407610103/images/sg8.png'
        };
    }
    render(){
        return(
            <Link to="/test">
                <div className="Post-image">
                    <div className="Post-image-bg">
                        <img alt="Icon Living" src={this.state.src} />
                    </div>
                </div>
            </Link>
        );
    }
    
}

export default PostImage;