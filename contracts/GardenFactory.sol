//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./StemPoints.sol";
import "./Garden.sol";

contract GardenFactory {
    Garden gardenContract;
    StemPoints stemPoints;

    mapping(address => address) public playerGardenAddress;

    constructor(address stemPointsAddress) {
        stemPoints = StemPoints(stemPointsAddress);
    }

    function buyGarden() public {
        Garden newGarden = new Garden(msg.sender, address(stemPoints));
        playerGardenAddress[msg.sender] = address(newGarden);
    }

    function getPlayerGardenAddresses(address player) public view returns (address){
        return playerGardenAddress[player];
    }
}