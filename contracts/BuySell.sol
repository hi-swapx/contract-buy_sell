// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../types/Params.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuySell is Ownable {
    mapping(address => bool) tokenAddresses;
    address[] tokens;
    event Deposit(uint256 amount, address tokenAddress);
    event Withdraw(uint256 amount, address tokenAddress, address toAddress);

    error NotSupportToken(address tokenAddress);
    error AllowanceError();

    constructor() Ownable(msg.sender) {}

    function addSupportToken(address _tokenAddress) public onlyOwner {
        require(_tokenAddress != address(0), "Token address cannot be zero"); // Check for valid address
        require(!tokenAddresses[_tokenAddress], "Duplicate Token");
        tokenAddresses[_tokenAddress] = true;
        tokens.push(_tokenAddress);
    }

    function getSupportToken() public view returns (address[] memory) {
        return tokens;
    }

    function deposit(DepositParams calldata params) public payable {
        require(tokenAddresses[params.tokenAddress], "Invalid Token");
        IERC20 token = IERC20(params.tokenAddress);
        uint256 allowedAmount = token.allowance(msg.sender, address(this));
        if (allowedAmount < params.amount) {
            revert AllowanceError();
        }
        bool tfRes = token.transferFrom(
            msg.sender,
            address(this),
            params.amount
        );
        require(tfRes);
        emit Deposit(params.amount, params.tokenAddress);
    }

    function withdraw(WithdrawParams calldata params) public onlyOwner {
        IERC20 token = IERC20(params.tokenAddress);
        token.transfer(params.toAddress, params.amount);
        emit Withdraw(params.amount, params.tokenAddress, params.toAddress);
    }
}
