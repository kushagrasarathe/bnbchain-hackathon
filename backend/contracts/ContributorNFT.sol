// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface Contributors {
    function getContribution(address _user) external view returns (bool);
}

contract ContributorNFT is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    /// price =  0.05 ether

    Counters.Counter private _tokenIdCounter;
    string baseURI;

    Contributors _contributor;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    constructor(
        string memory _base,
        address _contributorContract
    ) ERC721("Scientia DAO Contributor", "SCIContributor") {
        baseURI = _base;
        _contributor = Contributors(_contributorContract);
    }

    // to change the URI at any point of time , the URI is same for all the tokens as we DAO NFT is same for all
    function changeURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    /// for every token ID we have the same metadata as the DAO NFT is same for everybody
    ///  we can create dynmaic on Chain NFT data too which is dynamic for users input
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return baseURI;
    }

    /// to mint the token ID for the DAO user to join the DAO
    /// can be called by anybody , but it will be called in backend just by the DAO members
    /// NFT will be minted only if the user has contriubuted , the option to mint a NFT will be shown but checked first and then only allowed to mint
    function safeMint(address to) public {
        require(
            _contributor.getContribution(msg.sender),
            "You are not a contributor"
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    // we will allow to call transfer only when the nft is either minted or burnt
    // So the to and fro address will be the 0 address
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        require(
            to == address(0) || from == address(0),
            "The NFT is non transferrable"
        );
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    /// can be called by the owner of token to exit the DAO
    /// Burns the token ID from the users Account
    function burn(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only owner of the token can burn it"
        );
        _burn(tokenId);
    }

    /// function to remove someone from the DAO  , called only by the owner
    /// will burn the token ID from the users account
    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    /// after any token transfer , events are emitted, revoke show when the NFT is burnt
    /// attest when NFT is minted
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
