//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Garden.sol";

contract GardenFactory {
    Garden gardenContract;

    mapping(address => address) public playerGardenAddress;

    constructor() {}

    function buyGarden() public {
        Garden newGarden = new Garden(msg.sender);
        playerGardenAddress[msg.sender] = address(newGarden);
    }

    function getPlayerGardenAddresses(address player) public view returns (address){
        return playerGardenAddress[player];
    }
}