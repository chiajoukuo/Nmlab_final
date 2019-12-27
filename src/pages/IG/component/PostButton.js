import React,{Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import './IG_style.css';
import getWeb3 from "../../../utils/getWeb3";
import Posting from "../../../../build/contracts/Posting.json"
import User from "../../../../build/contracts/User.json"


class PostButton extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            post_id:this.props.postID,
            like_num:this.props.likeNum,//0,
            like:this.props.like,//false,
            src:'https://image.flaticon.com/icons/svg/149/149217.svg',
            message_num:this.props.msgNum,//0,
            bought_num:this.props.userNum,//0,
            modal:false,
        };
        this.asynConstructor = this.asynConstructor.bind(this);
        this.asynConstructor();
        this.src=[
            'https://image.flaticon.com/icons/svg/149/149217.svg',
            'https://image.flaticon.com/icons/svg/148/148836.svg'
        ];
        this.click_like=this.click_like.bind(this);
        this.toggle = this.toggle.bind(this);
        
       
    }
    asynConstructor = async () => {
        
        try {
            console.log("button 1")
            const web3 = this.props.web3;//this.props.web3;//await getWeb3();
            console.log("button 2")
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const PostingdeployedNetwork = Posting.networks[networkId];
            const UserdeployedNetwork = User.networks[networkId];
            const instance = new web3.eth.Contract(
                Posting.abi,
                PostingdeployedNetwork && PostingdeployedNetwork.address,
            );
            const instance1 = new web3.eth.Contract(
                User.abi,
                UserdeployedNetwork && UserdeployedNetwork.address,
            );
            this.setState({ web3, accounts, posting: instance, user: instance1 });
                } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
        var like = await this.state.posting.methods.getWhetherUserLike(this.state.post_id).call()
        
        if(like){
            this.setState({
                src:this.src[1],
                like:like
            })
        }
        else{
            this.setState({like:like})
        }

      };

    async click_like (){
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
        const postid = this.state.post_id;
        await this.state.posting.methods.toggleLikes(postid).send({ from: this.state.accounts[0]});
        console.log(await this.state.posting.methods.getLikeNumByID(0).call())
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
                    <img className='message_button' src='https://image.flaticon.com/icons/svg/1380/1380338.svg'/>
                    <span className='like_num'>{this.state.message_num}</span>
                    <img onClick={this.toggle} className='purchase_button' src='https://image.flaticon.com/icons/svg/1170/1170678.svg'/>
                    <span className='like_num'>{this.state.bought_num}</span>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader onClick={this.toggle}>Purchase this image.</ModalHeader>
                    <ModalBody>
                        purchase information
                        <div>
                            NT$ 0.01
                        </div>
                        <Button size="sm" onClick={this.upload_post} style={{ marginBottom: "5px", marginTop:"10px"}} >
                            cancel
                            {/* <CloudUploadIcon
                            size="small"
                            style={{ marginLeft: "5px" }}
                            /> */}
                        </Button>
                        <Button size="sm" onClick={this.upload_post} style={{ marginBottom: "5px", marginLeft: "5px",marginTop:"10px"}} >
                            purchase
                            {/* <CloudUploadIcon
                            size="small"
                            style={{ marginLeft: "5px" }}
                            /> */}
                        </Button>
                        
                    </ModalBody>
                </Modal>
            </>
        );
    }
    
}

export default PostButton;