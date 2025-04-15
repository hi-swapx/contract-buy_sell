// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../types/Params.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuySell is Ownable {
    using SafeERC20 for IERC20;

    mapping(address => bool) tokenAddresses;
    address[] tokens;
    event Deposit(uint256 amount, address tokenAddress);
    event Withdraw(uint256 amount, address tokenAddress, address toAddress);
    event AddSupportToken(address tokenAddress);
    event RemoveSupportToken(address tokenAddress);

    error AllowanceError();

    constructor() Ownable(msg.sender) {}

    function addSupportToken(address _tokenAddress) public onlyOwner {
        require(_tokenAddress != address(0), "Token address cannot be zero"); // Check for valid address
        require(!tokenAddresses[_tokenAddress], "Duplicate Token");
        tokenAddresses[_tokenAddress] = true;
        emit AddSupportToken(_tokenAddress);
    }

    function removeSupportToken(address _tokenAddress) public onlyOwner {
        require(_tokenAddress != address(0), "Token address cannot be zero"); // Check for valid address
        require(tokenAddresses[_tokenAddress], "Token address does not exist");
        delete tokenAddresses[_tokenAddress];
        emit RemoveSupportToken(_tokenAddress);
    }

    function checkIsSupportToken(
        address _tokenAddress
    ) public view returns (bool) {
        return tokenAddresses[_tokenAddress];
    }

    function deposit(DepositParams calldata params) public {
        require(tokenAddresses[params.tokenAddress], "Invalid Token");
        IERC20 token = IERC20(params.tokenAddress);
        uint256 allowedAmount = token.allowance(msg.sender, address(this));
        if (allowedAmount < params.amount) {
            revert AllowanceError();
        }
        token.safeTransferFrom(msg.sender, address(this), params.amount);
        emit Deposit(params.amount, params.tokenAddress);
    }

    function withdraw(WithdrawParams calldata params) public onlyOwner {
        IERC20 token = IERC20(params.tokenAddress);
        token.safeTransfer(params.toAddress, params.amount);
        emit Withdraw(params.amount, params.tokenAddress, params.toAddress);
    }
}
