// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZebbyCoin is ERC20, Ownable {
    mapping(address => uint256) private _staked;
    mapping(address => uint256) private _lastStakeTimestamp;
    uint256 private _rewardRate = 5;

    constructor(address initialOwner) 
        ERC20("ZebbyCoin", "ZBC") 
        Ownable(initialOwner)
    {}

    function toMint(address to, uint256 amount) public {
        uint256 adjustedAmount = amount * 1e18;
        _mint(to, adjustedAmount);
    }

    function toStake(uint256 amount) public {
        uint256 adjustedAmount = amount * 1e18;

        require(adjustedAmount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= adjustedAmount, "Insufficient balance");

        _staked[msg.sender] += adjustedAmount;
        _lastStakeTimestamp[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), adjustedAmount);
    }

    function toWithdraw() public {
        require(_staked[msg.sender] > 0, "No staked tokens");
        uint256 stakedAmount = _staked[msg.sender];
        uint256 reward = ((block.timestamp - _lastStakeTimestamp[msg.sender]) * _rewardRate) * 1e18;

        _staked[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
    }

    function stakedAmount(address account) public view returns (uint256) {
        uint256 stakedInWei = _staked[account];
        uint256 stakedInEth = stakedInWei / 1e18;
        return stakedInEth;
    }

    function withdrawAmount(address account) public view returns (uint256) {
        uint256 stakedAmount = _staked[account] / 1e18;
        uint256 reward = ((block.timestamp - _lastStakeTimestamp[account]) * _rewardRate);
        uint256 total = reward + stakedAmount; 
        return total;
    }

    function getElapsedStakeTime(address account) public view returns (uint256) {
        uint256 time = (block.timestamp - _lastStakeTimestamp[account]);
        return time;
    } 

    function getLastStakeTimestamp(address account) public view returns (uint256) {
        return _lastStakeTimestamp[account];
    }
}
