import React, { Component } from 'react';
import PostHead from './component/PostHead';
import PostImage from './component/PostImage';
import PostButton from './component/PostButton';
import PostContent from './component/PostContent';
import PostComments from './component/PostComments';
import './component/IG_style.css';


class PicturePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render(){

        return(
            <div className='picture_page'>
                <div className='between'></div>
                    <article className="picture_Post" >
                        <PostHead/>
                        <PostImage/>
                        <PostButton/>
                        <PostContent/>
                        <PostComments/>
                        
                    </article>
                <div className='between'></div>
                    {/* 
                    <a href="https://www.instagram.com/hannahkuo_1119/?hl=zh-tw">
                        <img src="https://www.102like.com/manage/0/product/30802/1516761523_922.jpg"/>
                    </a>	
                    
                    <h4>日期: 2019/11/26 11:48</h4>
                    <p>
                    <input type = "button" value = "購買" onClick="if(confirm('確定要購買嗎?'))this.form.submit();"/>
                    
                    <button type="button" >	讚</button>
                    : <a id="clicks">0</a>
                    </p>
                
                    <h4>留言 <input type="text" /></h4> */}
                    
            </div>
        
        );
    }
}

export default PicturePage;