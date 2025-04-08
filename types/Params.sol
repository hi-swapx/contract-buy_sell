// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

struct DepositParams {
    uint256 amount;
    address tokenAddress;
}

struct WithdrawParams {
    uint256 amount;
    address tokenAddress;
    address toAddress;
}
