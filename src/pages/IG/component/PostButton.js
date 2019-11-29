import React,{Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import './IG_style.css';


class PostButton extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            like_num:0,
            like:false,
            src:'https://image.flaticon.com/icons/svg/149/149217.svg',
            modal:false
        };
        this.src=[
            'https://image.flaticon.com/icons/svg/149/149217.svg',
            'https://image.flaticon.com/icons/svg/148/148836.svg'
        ];
        this.click_like=this.click_like.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    click_like (){
        const like_status=!this.state.like;
        var src_status=this.src[0];
        var like_num_status=this.state.like_num-1;
        if(like_status){
            src_status=this.src[1];
            like_num_status +=2;
        }
        this.setState({
            like:like_status,
            like_num:like_num_status,
            src:src_status
        })
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        //console.log('toggle')
    }
    render(){
        return(
            <>
                <div className='post_buttons'>
                    <img className='like_button' onClick={this.click_like} src={this.state.src}/>
                    <span className='like_num'>{this.state.like_num}</span>
                    <img onClick={this.toggle} className='purchase_button' src='https://image.flaticon.com/icons/svg/1170/1170678.svg'/>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader onClick={this.toggle}>Purchase this image.</ModalHeader>
                    <ModalBody>
                        purchase information
                    </ModalBody>
                </Modal>
            </>
        );
    }
    
}

export default PostButton;