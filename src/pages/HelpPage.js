import React,{Component} from 'react';
import './IG/component/IG_style.css'
import '../css/style.css'

import { Icon } from 'react-icons-kit'
import {upload3} from 'react-icons-kit/icomoon/upload3'
import {ic_save} from 'react-icons-kit/md/ic_save'


class HelpPage extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render(){
        return(
            <>
                <div className='between'></div>
                <h1 className='upload_title'>User Guide</h1>
                <div className='between'></div>
                <h3 className='help_topic'>Gallery : </h3>
                <p className='help_text'>In the gallery, users can browse all other users' posts with pictures they creates.</p>
                <p className='help_text'>Additionally, they can press like and leave comments to interact with other users just like other social media.</p>
                <p className='help_text'>The best thing here is that users can purchase images they like for other uses such as post on another wall to share with your friends. </p>
                <h3 className='help_topic'>Posts : </h3>
                <p className='help_text'>In the posts, users can skim through all posts which are based on previously upload picture and perform operations like </p>
                <h3 className='help_topic'>Post : </h3>
                <p className='help_text'>Here users can use the images they bought to create posts.</p>
                <h3 className='help_topic'>Upload : </h3>
                <p className='help_text'>Users can upload images from their devices and use them to create posts. </p>
                <h3 className='help_topic'>Setting : </h3>
                <p className='help_text'>In our DApp, accounts are binded to Ethereum accounts. Please don't worry about not setting accounts and passwards. </p>
                <div className='bgg'></div>
            </>
        );
    }
    
}

export default HelpPage;
