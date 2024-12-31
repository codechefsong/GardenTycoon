//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./StemPoints.sol";

contract Garden {
    StemPoints stemPoints;

    Plant[] public plants;
    address public immutable owner;
    address public coOwner;
    uint256 public totalPlants;
    uint256 public lastTimeAttackByInsect;
    bool isDanger;

    struct Plant {
        uint256 id;
        uint256 timeBorn;
        uint256 lastTimeWater;
        uint256 lastTimeCollected;
        uint256 level;
        uint8 exp;
    }

    constructor(address _owner, address stemPointsAddress) {
        owner = _owner;
        stemPoints = StemPoints(stemPointsAddress);
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function setCoOwner(address newCoOwner) public isOwner {
        coOwner = newCoOwner;
    }

    function createPlant() public {
        plants.push(Plant(totalPlants, block.timestamp, block.timestamp, block.timestamp, 1, 0));
        totalPlants++;
    }

    function waterPlant(uint256 index) public {
        plants[index].lastTimeWater = block.timestamp;
        earnEXP(index);
    }

    function collectPoints(uint256 index) isOwner external {
        uint256 amount = block.timestamp - plants[index].lastTimeCollected;
        stemPoints.mint(msg.sender, amount * plants[index].level);
        plants[index].lastTimeCollected = block.timestamp;
    }

    function buyAndPlantInsect() public {
        lastTimeAttackByInsect = block.timestamp + 10;
        isDanger = true;
    }

    function earnEXP(uint256 index) internal  {
        plants[index].exp += 1;

        if (plants[index].exp >= 5) {
            plants[index].exp = 0;
            plants[index].level += 1;
        }
    }

    function getPlants() public view returns (Plant[] memory){
        return plants;
    }
}
