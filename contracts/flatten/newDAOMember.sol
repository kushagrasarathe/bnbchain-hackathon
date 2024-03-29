

// Sources flattened with hardhat v2.20.1 https://hardhat.org

// SPDX-License-Identifier: MIT AND Unlicense

// File @openzeppelin/contracts/utils/Context.sol@v4.8.0

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v4.8.0

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (access/Ownable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File contracts/newDAOMember.sol

// Original license: SPDX_License_Identifier: Unlicense
pragma solidity ^0.8.10;

interface NFT {
    function balanceOf(address owner) external view virtual returns (uint256);

    function safeMint(address to) external;
}

/// issue
/// mapping will overwrite the initial record for the particular address in the membersPaperList ,that way it will not return the whole collection
/// return of the whole mapping

contract newDAOMember is Ownable {
    event ApprovalMemberRejected(address indexed rejectedAddress);

    struct ResearchPaper {
        address researcher;
        uint256 dateOfPublication; //time when the paper is published
        string researchPaperURI;
    }

    struct Member {
        address memberAddress;
        uint256 yayVotes;
        uint256 nayVotes;
        uint256 votingStartTime;
        bool approval;
        string ipfsURI;
        string[] researchesURI;
    }
    /// string array of ipfsURI

    /// @dev cases for voting for adding a member
    enum Vote {
        YES, // YES = 0
        NO // NO = 1
    }

    uint256 public votingDuration = 2 days;

    uint256 public counterResearches = 0;
    uint256 public counterMembers = 0;
    uint256 public counterRequestList = 0;

    NFT nft;

    /// @dev record of all the members of the DAO for their details
    mapping(uint256 => Member) public membersList;
    mapping(address => bool) public Approved;

    // to track the voting for the requests to disable multi voting
    mapping(uint256 => mapping(address => bool)) public voters;

    /// @dev requests to add new member
    mapping(uint256 => Member) public requestList;

    /// @dev mapping from memberAddress -->  research paper
    mapping(address => ResearchPaper[]) public membersPaperList;

    /// @dev mapping from researchNo -->researchPaper
    mapping(uint256 => ResearchPaper) public researchesPublishedList;

    constructor(address _NFT) {
        nft = NFT(_NFT);
    }

    /// @dev conditional functions
    /// requirements - user must own an NFT
    modifier onlyDAOMember() {
        require(nft.balanceOf(msg.sender) > 0, " You are not a DAO member");
        _;
    }

    function addResearch(string memory researchPaperURI) public onlyDAOMember {
        /// add the research to the common ResearchPaper Array to show it to all s
        researchesPublishedList[counterResearches] = ResearchPaper(msg.sender, block.timestamp, researchPaperURI);

        counterResearches += 1;

        /// adds the research for the specific member
        membersPaperList[msg.sender].push(ResearchPaper(msg.sender, block.timestamp, researchPaperURI));
    }

    /// @dev -  this enables you to add the DAO members
    /// @dev - NFT is minted later to make him a DAO member
    /// @param _id - id of the member to be added from the requests array
    /// Requirments : Only DAO Member can call this function
    function addMember(uint256 _id) public {
        Member storage member = requestList[_id];
        require(block.timestamp > member.votingStartTime + votingDuration, "Voting hasn't ended yet for this member!");
        if (member.yayVotes > member.nayVotes) {
            membersList[counterMembers] = member;
            counterMembers += 1;
            Approved[member.memberAddress] = true;
            nft.safeMint(member.memberAddress);
        } else {
            emit ApprovalMemberRejected(member.memberAddress);
        }
        delete requestList[_id];
        // TODO : delete the member from the requestList
    }

    // /// to end the vote and add the member to the Members List
    // function endVote(uint256 _id) public onlyOwner {
    //     Member storage member = requestList[_id];
    //     require(
    //         block.timestamp > member.votingStartTime + votingDuration,
    //         "Voting hasn't ended yet for this member!"
    //     );
    // }

    function addRequest(string memory ipfsURI, string[] memory researchesURI) public {
        requestList[counterRequestList] = Member(msg.sender, 0, 0, block.timestamp, false, ipfsURI, researchesURI);
        counterRequestList += 1;
    }

    // voting function for requested member
    function vote(Vote _vote, uint256 _id) public onlyDAOMember {
        Member storage member = requestList[_id];
        require(block.timestamp > member.votingStartTime, "You can't approve this person before the voting starts.");
        require(block.timestamp < member.votingStartTime + votingDuration, "Voting has already ended");
        require(voters[_id][msg.sender] == false, "You have already voted");
        if (_vote == Vote.YES) member.yayVotes += 1;
        else member.nayVotes += 1;
        voters[_id][msg.sender] == true;
    }

    /// just a mock function for the chainlink keepers to be able to close the open requestss
    function _perform() public {
        for (uint256 id = 0; id < counterRequestList; id++) {
            Member storage member = requestList[id];
            require(
                block.timestamp > member.votingStartTime + votingDuration, "Voting hasn't ended yet for this member!"
            );
            addMember(id);
        }
    }

    /// @dev - To get a particular research
    /// @param  _index - the index of the research paper to be viewed in the researchesPublishedList
    /// @return - the research paper at the given index
    function getResearch(uint256 _index) public view returns (ResearchPaper memory) {
        return researchesPublishedList[_index];
    }

    /// @dev - To get all the members in the DAO
    /// @return - array that contains all the members
    function getMembers(uint256 _id) public view returns (Member memory) {
        return membersList[_id];
    }

    // to get a specific a request to be able to approve it
    function getRequest(uint256 _id) public view returns (Member memory) {
        return requestList[_id];
    }

    /// get the researches for a specific Members
    function getMembersResearch(address _user) public view returns (ResearchPaper[] memory) {
        return membersPaperList[_user];
    }

    // to check the status of approval for address
    function getApproval(address _address) public view returns (bool) {
        return Approved[_address];
    }

    ///returns the status of a voter whether they have voted or not
    function getVoterStatus(address _user, uint256 _id) public view returns (bool) {
        return voters[_id][_user];
    }
}
