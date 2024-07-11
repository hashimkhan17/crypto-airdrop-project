// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AirDrop is Ownable(msg.sender) {
    IERC20 public Token;
    bytes32 private  root;
    uint256 public immutable rewardAmount;
    address public immutable token;
    mapping(address => bool) claimed;
    uint256 private startDate;
    uint256 private endDate;

    constructor( uint256 _rewardAmount, address _token) {
        rewardAmount = _rewardAmount;
        token = _token;
        Token = IERC20(_token);
    }
// bytes32 _root
    function setAirdrop( uint256 _startDate, uint256 _endDate) external onlyOwner {
          root = _root;
        startDate = _startDate;
        endDate = _endDate;
    }

    function claim(bytes32[] calldata _proof) external {
          require(block.timestamp >= startDate, "Sale has not started yet");
         require(block.timestamp <= endDate, "Sale has ended");

        require(!claimed[msg.sender], "Already claimed air drop");
         claimed[msg.sender] = true;
         bytes32 _leaf = keccak256(abi.encodePacked(msg.sender));
         require(
             MerkleProof.verify(_proof, root, _leaf),
            "Incorrect merkle proof"
         );

        require(Token.balanceOf(address(this)) >= rewardAmount, "Not enough tokens in contract");
        require(Token.transfer(msg.sender, rewardAmount), "Token transfer failed");
    }
}
