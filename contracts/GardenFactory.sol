//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./StemPoints.sol";
import "./Garden.sol";

contract GardenFactory {
    Garden gardenContract;
    StemPoints stemPoints;

    mapping(address => address) public playerGardenAddress;
    mapping(address => bool) public isPlayer;
    PlantGarden[] public plantGardens;

    struct PlantGarden {
        uint256 id;
        address gardenAddress;
        address owner;
    }

    constructor(address stemPointsAddress) {
        stemPoints = StemPoints(stemPointsAddress);
    }

    function buyGarden() public {
        Garden newGarden = new Garden(msg.sender, address(stemPoints));
        playerGardenAddress[msg.sender] = address(newGarden);

        plantGardens.push(PlantGarden(plantGardens.length, address(newGarden), msg.sender));
    }

    function getPlayerGardenAddress(address player) public view returns (address){
        return playerGardenAddress[player];
    }

    function getGardens() public view returns (PlantGarden[] memory){
        return plantGardens;
    }
}
