//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./StemPoints.sol";

contract Garden {
    StemPoints stemPoints;

    address public immutable owner;
    uint256 public totalPlants;
    Plant[] public plants;

    struct Plant {
        uint256 id;
        uint256 timeBorn;
        uint256 lastTimeWater;
        uint256 level;
    }

    constructor(address _owner, address stemPointsAddress) {
        owner = _owner;
        stemPoints = StemPoints(stemPointsAddress);
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function getPlants() public view returns (Plant[] memory){
        return plants;
    }

    function createPlant() public {
        plants.push(Plant(totalPlants, block.timestamp, block.timestamp, 1));
    }

    function waterPlant(uint256 index) public {
        plants[index].lastTimeWater = block.timestamp;
    }
}