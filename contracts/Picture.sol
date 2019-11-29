pragma solidity ^0.5.0;


contract Picture {

  struct Post {
    address maker;
    address user;
    uint32 cost;
    uint32 likeNum;
    //string[] messages;
    //bytes32[] hashTags;
  }

  Post[] public posts;
  /*
  function _createPost(address _maker, address _user, uint cost) private{
    posts.push(Post(_maker, _user, cost, 0));
  }
  */
  function createPost(address _maker, address _user, uint32 cost) public returns (uint){
    return (posts.push(Post(_maker, _user, cost, 0))-1);
  }

  function getPost(uint id) public view returns (address, address, uint32, uint32) {
    return (posts[id].maker, posts[id].user, posts[id].cost, posts[id].likeNum);
  }

  function getNum() public view returns(uint) {
    return posts.length;
  }


  string message;
  constructor() public {
    message = "NMLAB";
  }


  // A Getter function
  function SayHello() public view returns (string memory) {
    return message;
  }

  // A Setter function
  function SetMessage(string memory newMessage) public {
    message = newMessage;
  }
}