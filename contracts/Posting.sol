pragma solidity ^0.5.0;


contract Posting {
  struct Post {
    uint authorID;
    uint[] users;
    uint[] whoLike;
    string postInfo;
    string[] msgs;
    uint[] msgOwnerID;
  }

  Post[] public posts;

  /******************
    post Basic Part
  *******************/
  function createPost(uint _authorID, string memory _postInfo) public returns (uint) {
    Post memory myPost;
    myPost.authorID = _authorID;
    myPost.postInfo = _postInfo;
    return (posts.push(myPost));
  }

  function getPostByID(uint _postID) public view validPostID(_postID) returns(uint, uint[] memory, string memory, uint, uint[] memory, uint) {
    return (
      posts[_postID].authorID,
      posts[_postID].users,
      posts[_postID].postInfo,
      posts[_postID].whoLike.length,
      posts[_postID].whoLike,
      posts[_postID].msgs.length
    );
  }

  function getPostNum() public view returns(uint) {
    return posts.length;
  }

  function getPostByHashtag(string memory _hashtag)public view returns(uint[] memory) {
    bool[] memory logArr = new bool[](getPostNum());
    uint count = 0;
    for (uint i = 0;i<getPostNum();i++){
      logArr[i] = checkHashtag(i, _hashtag);
      if (logArr[i]==true){
        count++;
      }
    }
    uint index = 0;
    uint[] memory candidate = new uint[](count);
    for (uint i = 0;i<getPostNum();i++){
      if (logArr[i] == true){
        candidate[index] = i;
        index++;
      }
    }
    return candidate;
  }


  /******************
     Post Msg Part
  *******************/
  function getMsgNum(uint _postID) public view validPostID(_postID) returns(uint){
    return posts[_postID].msgs.length;
  }

  function getSingleMsg(uint _postID, uint _msgID) public view validMsgID(_postID, _msgID) returns(string memory, uint){
    require((_postID<posts.length), "postID out of bound");
    require((_msgID<posts[_postID].msgs.length), "msgID out of bound");
    return (posts[_postID].msgs[_msgID], posts[_postID].msgOwnerID[_msgID]);
  }

  function updateMsg(uint _postID, uint _msgID, string memory _msg) public validMsgID(_postID, _msgID) {
    posts[_postID].msgs[_msgID] = _msg;
  }

  function addMessage(uint _postID, uint _msgOwnerID, string memory _msg) public validPostID(_postID) {
    posts[_postID].msgs.push(_msg);
    posts[_postID].msgOwnerID.push(_msgOwnerID);
  }

  /******************
     Post Like Part
  *******************/
  function getLikeNumByID(uint _postID) public view validPostID(_postID) returns(uint) {
    return posts[_postID].whoLike.length;
  }

  function toggleLikes(uint _postID, uint _user) public validPostID(_postID) returns(uint){
    for (uint i = 0; i < posts[_postID].whoLike.length;i++){
      if (posts[_postID].whoLike[i] == _user) {
        posts[_postID].whoLike[i] = posts[_postID].whoLike[posts[_postID].whoLike.length-1];
        posts[_postID].whoLike.length--;
        return posts[_postID].whoLike.length;
      }
    }
    posts[_postID].whoLike.push(_user);
    return posts[_postID].whoLike.length;
  }

  function getWhetherUserLike(uint _postID, uint _user) public view validPostID(_postID) returns(bool){
    for (uint i = 0; i < posts[_postID].whoLike.length;i++){
      if (posts[_postID].whoLike[i] == _user) {
        return true;
      }
    }
    return false;
  }

  /******************
     Post User Part
  *******************/
  function addUser(uint _postID, uint _user) public validPostID(_postID) {
    posts[_postID].users.push(_user);
  }

  function getPostUsers(uint _postID) public view validPostID(_postID) returns(uint[] memory) {
    return posts[_postID].users;
  }



  /******************
   Post Utility Part
  *******************/

  function getHashTag(string memory input) public pure returns(string memory){
    bytes memory inputStr = bytes(input);
    string memory haha = "";
    for (uint i = 0;i<inputStr.length;i++) {
      if (inputStr[i] == "#"){
        i++;
        uint start = i;
        while (inputStr[i]!="#" && inputStr[i]!=" "){
          i++;
          if (i == inputStr.length-1) {
            i++;
            break;
          }
        }
        uint length = i-start;
        bytes memory tag = new bytes(length);
        for (uint j = 0; j<length; j++){
          tag[j] = inputStr[start + j];
        }
        i--;
        haha = strConcat(haha, "#");
        haha = strConcat(haha, string(tag));
      }
    }
    return haha;
  }

  function checkHashtag(uint _postID, string memory _hashtag) public view validPostID(_postID) returns(bool){
    bytes memory inputStr = bytes(posts[_postID].postInfo);
    for (uint i = 0;i<inputStr.length;i++) {
      if (inputStr[i] == "#"){
        i++;
        uint start = i;
        while (inputStr[i]!="#" && inputStr[i]!=" "){
          i++;
          if (i == inputStr.length-1) {
            i++;
            break;
          }
        }
        uint length = i-start;
        bytes memory tag = new bytes(length);
        for (uint j = 0; j<length; j++){
          tag[j] = inputStr[start + j];
        }
        i--;
        if (keccak256(abi.encodePacked((_hashtag))) == keccak256(abi.encodePacked((string(tag))))){
          return true;
        }
      }
    }
    return false;
  }

  modifier validPostID(uint _postID){
    require((_postID<posts.length), "postID out of bound");
    _;
  }

  modifier validMsgID(uint _postID, uint _msgID){
    require((_postID<posts.length), "postID out of bound");
    require((_msgID<posts[_postID].msgs.length), "msgID out of bound");
    _;
  }


  function strConcat(string memory _a, string memory _b) internal pure returns (string memory){
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    string memory _c = new string(_ba.length + _bb.length);
    bytes memory _bc = bytes(_c);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) _bc[k++] = _ba[i];
    for (uint i = 0; i < _bb.length; i++) _bc[k++] = _bb[i];
    return string(_bc);
  }

  /******************
      Simple Test
  *******************/

  string message;
  constructor() public {
    message = "NMLAB";
  }

  function SayHello() public view returns (string memory) {
    return message;
  }

  // A Setter function
  function SetMessage(string memory newMessage) public {
    message = newMessage;
  }
}
