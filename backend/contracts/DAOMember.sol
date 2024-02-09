//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";

interface NFT {
    function balanceOf(address owner) external view virtual returns (uint256);

    function safeMint(address to) external;
}

/// issue
/// mapping will overwrite the initial record for the particular address in the membersPaperList ,that way it will not return the whole collection
/// return of the whole mapping

contract DAOMember is Ownable {
    event ApprovalMemberRejected(address indexed rejectedAddress);

    struct ResearchPaper {
        address researcher;
        uint256 dateOfPublication; //time when the paper is published
        string researchPaperURI;
    }

    struct Member {
        address memberAddress;
        string name;
        string bio;
        uint256 yayVotes;
        uint256 nayVotes;
        uint256 votingStartTime;
        bool approval;
        string pfpURI; /// profile picture URI
        string foR; /// field of research
        string[] researchesURI; /// string array of ipfsURI
    }

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

    /// @dev requests to add new member
    mapping(uint256 => Member) public requestList;

    /// @dev mapping from memberAddress -->  research paper
    mapping(address => ResearchPaper) public membersPaperList;

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
        researchesPublishedList[counterResearches] = ResearchPaper(
            msg.sender,
            block.timestamp,
            researchPaperURI
        );

        counterResearches += 1;

        /// adds the research for the specific member
        membersPaperList[msg.sender] = ResearchPaper(
            msg.sender,
            block.timestamp,
            researchPaperURI
        );
    }

    /// @dev -  this enables you to add the DAO members
    /// @dev - NFT is minted later to make him a DAO member
    /// @param _id - id of the member to be added from the requests array
    /// Requirments : Only DAO Member can call this function
    function addMember(uint256 _id) public onlyDAOMember onlyOwner {
        Member storage member = requestList[_id];
        require(
            block.timestamp > member.votingStartTime + votingDuration,
            "Voting hasn't ended yet for this member!"
        );
        if (member.yayVotes > member.nayVotes) {
            membersList[counterMembers] = member;
            counterMembers += 1;
            Approved[member.memberAddress] = true;
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

    function addRequest(
        string memory _name,
        string memory _bio,
        string memory _pfpURI,
        string memory _foR,
        string[] memory researchesURI
    ) public {
        requestList[counterRequestList] = Member(
            msg.sender,
            _name,
            _bio,
            0,
            0,
            block.timestamp,
            false,
            _pfpURI,
            _foR,
            researchesURI
        );
        counterRequestList += 1;
    }

    // voting function for requested member
    function vote(Vote _vote, uint256 _id) public {
        Member storage member = requestList[_id];
        require(
            block.timestamp > member.votingStartTime,
            "You can't approve this person before the voting starts."
        );
        require(
            member.votingStartTime + votingDuration < block.timestamp,
            "Voting has already ended"
        );
        if (_vote == Vote.YES) member.yayVotes += 1;
        else member.nayVotes += 1;
    }

    /// @dev - To get a particular research
    /// @param  _index - the index of the research paper to be viewed in the researchesPublishedList
    /// @return - the research paper at the given index
    function getResearch(uint256 _index)
        public
        view
        returns (ResearchPaper memory)
    {
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

    function getMembersResearch(uint256 _id)
        public
        view
        returns (string[] memory)
    {
        return membersList[_id].researchesURI;
    }

    function getApproval(address _address) public view returns (bool) {
        return Approved[_address];
    }
}
