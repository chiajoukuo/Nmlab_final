pragma solidity >=0.4.25 <0.6.0;
import "../contracts/Posting.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestPosting{
    function testImitialPost() public{
        uint expected = 0;
        Posting posting = Posting(DeployedAddresses.Posting());
        uint num = posting.getPostNum();
        Assert.equal(expected, num, "There should be 0 post initially");
    }

    function testgetHashTagg() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        string memory parse = "asdfo;eo; dde#J&H";
        string memory output = posting.getHashTag(parse);
        Assert.equal("#J&H", output, "cool");
    }

    function testCreatePost() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        string memory postInfo = "I love Hannah #H&J";
        uint num = posting.createPost(15,postInfo);
        Assert.equal(1, posting.getPostNum(), "There should be 1 post after create post");
        Assert.equal(1, num, "There should be 1 post after create post");
    }

    function testGetPost() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        //return  authorID, users, postInfo, likeNum, whoLike, msgNum
        uint authorID;
        uint[] memory users;
        uint[] memory whoLike;
        uint likeNum;
        string memory postInfo;
        uint msgnum;
        (authorID, users, postInfo, likeNum, whoLike, msgnum) = posting.getPostByID(0);
        Assert.equal(postInfo, "I love Hannah #H&J", "Postinfo should be equal");
        Assert.equal(authorID, 15, "AuthorID should be equal");
    }

    function testMessageOperation() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        string memory cool = "cool";
        Assert.equal(0, posting.getMsgNum(0), "There should be 0 msg in post 0");
        posting.addMessage(0, 16, cool);
        Assert.equal(1, posting.getMsgNum(0), "There should be 1 msg in post 0");
        string memory returnStr;
        uint msgOwner;
        (returnStr, msgOwner) = posting.getSingleMsg(0,0);
        Assert.equal(returnStr, cool, "Msg should be equal");
        Assert.equal(msgOwner, 16, "Msg owner should be equal");
        posting.updateMsg(0,0,"Hello");
        (returnStr, msgOwner) = posting.getSingleMsg(0,0);
        Assert.equal(returnStr, "Hello", "Msg should be equal");
    }

    function testLIkeOperation() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        Assert.equal(posting.toggleLikes(0,12), 1, "LikeNum should be 1 after click");
        Assert.equal(posting.getWhetherUserLike(0,12), true, "Not like");
        Assert.equal(posting.toggleLikes(0,13), 2, "LikeNum should be 2 after another click");
        Assert.equal(posting.toggleLikes(0,12), 1, "LikeNum should be 1 after click");
        Assert.equal(posting.getWhetherUserLike(0,12), false, "Not like");
        Assert.equal(posting.getLikeNumByID(0),1, "LikeNUm should be 1");
        Assert.equal(posting.toggleLikes(0,14), 2, "LikeNum should be 2 after click");
        Assert.equal(posting.toggleLikes(0,12), 3, "LikeNum should be 3 after click");
    }

    function testUserOperation() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        posting.addUser(0,0);
        posting.addUser(0,3);
        uint[] memory users = posting.getPostUsers(0);
        Assert.equal(0, users[0], "First added user should be equal");
        Assert.equal(3, users[1], "Second added user should be equal");
    }

    function testHashtag() public{
        Posting posting = Posting(DeployedAddresses.Posting());
        posting.createPost(12, "I love Hannah #H&J#yo");
        posting.createPost(8, "I love Hannah #H&");
        posting.createPost(35, "I love Hannah #H&J");
        uint[] memory posts = posting.getPostByHashtag("H&J");
        Assert.equal(0, posts[0], "First post ID");
        Assert.equal(1, posts[1], "Second post ID");
        Assert.equal(3, posts[2], "Third post ID");
    }



}
