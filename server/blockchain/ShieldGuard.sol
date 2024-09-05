// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ShieldGuard {
    struct Alert {
        address node;
        string ip;
        uint256 timestamp;
        string action;
    }

    Alert[] public alerts;

    event NewAlert(address indexed node, string ip, uint256 timestamp, string action);

    function logAlert(string memory ip, string memory action) public {
        alerts.push(Alert(msg.sender, ip, block.timestamp, action));
        emit NewAlert(msg.sender, ip, block.timestamp, action);
    }

    function getAlerts() public view returns (Alert[] memory) {
        return alerts;
    }
}
