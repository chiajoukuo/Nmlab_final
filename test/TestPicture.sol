pragma solidity >=0.4.25 <0.6.0;
import "../contracts/Picture.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestPicture{
    function testImitialPicture() public{
        uint expected = 0;
        Picture pic = Picture(DeployedAddresses.Picture());
        uint num = pic.getNum();
        Assert.equal(expected, num, "There should be 0 picture initially");
    }

    function testcreatePost() public{
        Picture pic = Picture (DeployedAddresses.Picture());
        uint prev = pic.getNum();
        pic.createPost(msg.sender, msg.sender, 10);
        Assert.equal(prev+1, pic.getNum(), "Should increase one post after create");
    }

    function testgetPost() public{
        Picture pic = Picture(DeployedAddresses.Picture());
        address user = 0xE0f5206BBD039e7b0592d8918820024e2a7437b9;
        uint index = pic.createPost(msg.sender, user, 10);
        address rMaker;
        address rUser;
        uint32 rValue;
        uint32 rLikes;
        (rMaker, rUser, rValue, rLikes) = pic.getPost(index);
        Assert.equal(rMaker, msg.sender, "Maker should be equal");
        Assert.equal(rUser, user, "User shou;d be equal");
        Assert.equal(uint256(rValue), 10, "Cost should be equal");
        Assert.equal(uint256(rLikes), 0, "Likes should equal to 0");
    }
}