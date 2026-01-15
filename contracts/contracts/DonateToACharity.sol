//SPDX-License-Identifier:  Unlicense
pragma solidity ^0.8.0;

contract DonateToACharity {
    event NewDonor(
        address indexed donor,
        string donorName,
        uint256 amount,
        string charity
    );

    struct DonorInfo {
        address donorAddress;
        string donorName;
        uint256 amount;
        string charity;
    }

    DonorInfo[] donors;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function sendEthToCharity(string memory _donorName, string memory _charity)
        public
        payable
    {
        require(msg. value > 0, "Insufficient funds, Please fund account");

        donors.push(DonorInfo(
            msg.sender,
            _donorName,
            msg. value,
            _charity
        ));

        emit NewDonor(msg.sender, _donorName, msg.value, _charity);
    }

    function getDonors() public view returns (DonorInfo[] memory) {
        return donors;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        owner.transfer(address(this).balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}