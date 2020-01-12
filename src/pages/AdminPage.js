import React from "react";
import { render } from "react-dom";
import Posting from "../../build/contracts/Posting.json";
import getWeb3 from "../utils/getWeb3";

const deepai = require('deepai'); 
deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');


const leven = require('leven');
const imghash = require('imghash');



class AdminPage extends React.Component {

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompare = this.handleCompare.bind(this);
    }

    componentWillMount() {
        this.setState({
            allPic: [], picIndex: [], picID1: 'UNKNOWN', picID2: 'UNKNOWN', sim: 'UNKNOWN', ID1url: 'UNKNOWN', ID2url: 'UNKNOWN'
        });
    }


    handleCompare = async() => {
        console.log(this.state.ID1url)
        console.log(this.state.ID2url)
        console.log("First")
        /*
        var urlreader = new FileReader();
        var request = new XMLHttpRequest();
        request.open('GET', this.state.ID1url, true);
        request.responseType = 'blob';
        request.onload = function() { 
                urlreader.readAsDataURL(request.response);
                urlreader.onload =  function(e){
                const buffer = Buffer.from(urlreader.result);
                imghash.hash(buffer).then((hash) => {
                    console.log(hash); // '1000100010000010'
                  }).catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log("playback prevented");
                  });        
            };
        };
        request.send();
        */
       Promise
        .all(["4747474747873f09", "8e0f0f0f0f0f1f16"])
        .then((results) => {
            const dist = leven(results[0], results[1]);
            console.log(`Distance between images is: ${dist}`);
            if (dist <= 12) {
            console.log('Images are similar');
            } else {
            console.log('Images are NOT similar');
            }
        });
        console.log("Second")

        /*imghash
        .hash('/home/Desktop/child.jpg')
        .then((hash) => {
            console.log(hash); // 'f884c4d8d1193c07'
        });*/
        /*
        var resp = await deepai.callStandardApi("image-similarity", {
            image1: this.state.ID1url,
            image2: this.state.ID2url,
        });*/
        //this.setState({sim: resp.output.distance});
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        var ID1 = parseInt(data.get('id1'), 10);
        var ID2 = parseInt(data.get('id2'), 10);
        if (isNaN(ID1) || isNaN(ID2)) {
            alert(
                `Invalid Input!`,
              );
            return
        }
        var ID1est = false;
        var ID2est = false;
        var ID1pic;
        var ID2pic;
        for (var i=0;i<this.state.picIndex.length;i++){
            if (data.get('id1') === this.state.picIndex[i]){
                ID1est =true;
                ID1pic = this.state.allPic[i].pic;
            }
            if (data.get('id2') === this.state.picIndex[i]){
                ID2est =true;
                ID2pic = this.state.allPic[i].pic;
            }
        }
        if (ID1est===false || ID2est===false){
            alert(
                `No such ID!`,
              );
            return
        }
        await this.setState({picID1: ID1, picID2: ID2, ID1url: ID1pic, ID2url: ID2pic})
        await this.handleCompare();
      }
      

    componentDidMount = async () => {
        try {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const PostingdeployedNetwork = Posting.networks[networkId];
          const instance = new web3.eth.Contract(
            Posting.abi,
            PostingdeployedNetwork && PostingdeployedNetwork.address,
          );
          this.setState({ web3, accounts, posting: instance });
          this.setState({balance: await this.state.posting.methods.getBalance().call()});
    
          if (await this.state.posting.methods.getPostNum().call() === "0"){
            await this.state.posting.methods.createPost("I love Hannah #H&J#yo", "12319696969696969696969696969696969696").send({ from: this.state.accounts[0]});
          }
          
          const picArr = await this.state.posting.methods.getAllPost().call();
          console.log(picArr);
          var arr = [];
          for (var i = 0;i<picArr.length; i++){
              var postTmp = await this.state.posting.methods.getPostByID(picArr[i]).call();
              arr.push({id : picArr[i], pic : postTmp[6]});
          }
          this.setState({allPic: arr, picIndex: picArr});

        } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };

    render() {
        return (
          <div height="100%" border="0">
            <h1>AdminPage</h1>
            <h2> ============</h2>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="Input String">{"Compare two ID's picture:"}</label>
                <input id="useid1rname" placeholder="ID1" name="id1" type="text" />
                <input id="id2" placeholder="ID2" name="id2" type="text" />
                <input type="submit" value="Send!"/>
            </form>
            <h5>{"ID1: " + this.state.picID1}</h5>
            <h5>{"ID2: " + this.state.picID2}</h5>
            <h5>{"Similarity: " + this.state.sim}</h5>
            <div>
                <img style={{height: 300 }} src={this.state.ID1url}/>
                <img style={{height: 300 }} src={this.state.ID2url}/>
            </div>
            {this.state.allPic.map(item => {
              return (
              <div key={item.id}> 
                <img alt="" align="left" title={item.id} style={{height: 200 }} src={item.pic}/>
              </div>
              )
            })}
          </div>
        );
    }
}

export default AdminPage;