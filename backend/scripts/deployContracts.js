// const { main: deployDAOFunds } = require("./deployDAOFunds");
// const { main: deployGrants } = require("./deployGrants");
// const { main: deployMembers } = require("./deployMembers");
// const { main: deployNFT } = require("./deployNFT");
// const { main: deployNFT2 } = require("./deployNFT2");

async function main() {
  // const dao_funds = await deployDAOFunds();
  // const member_nft = await deployNFT();
  // const contributor_nft = await deployNFT2(dao_funds);
  // const member_contract = await deployMembers(member_nft);
  // const grant_contract = await deployGrants(member_nft, dao_funds);

  // const funds = await hre.ethers.getContractFactory("DAOFunds");
  // const FUNDS = await funds.deploy();

  // await FUNDS.deployed();

  // console.log(`DAO FUNDS deployed to ${FUNDS.address}`);

  // const MemberNFT = await hre.ethers.getContractFactory("MemberNFT");
  // const metadata =
  //   "ipfs://bafkreifxtpdf5lcmkqjqmpe4wjgfl4rbov23ryn5merejridxk27pfzufq";
  // const MEMBER_NFT = await MemberNFT.deploy(metadata);

  // await MEMBER_NFT.deployed();

  // console.log(`MEMBER_NFT deployed to ${MEMBER_NFT.address}`);

  // const ContributorNFT = await hre.ethers.getContractFactory("ContributorNFT");
  // const newMetadata =
  //   "ipfs://bafybeibz4dfk6zxsorvq5xiul7ncwuytfewpjchmhr5kf3scimst7vaete/metadata.json";
  // const CONTRIBUTOR_NFT = await ContributorNFT.deploy(
  //   newMetadata,
  //   FUNDS.address
  // );

  // await CONTRIBUTOR_NFT.deployed();

  // console.log(`CONTRIBUTOR_NFT deployed to ${CONTRIBUTOR_NFT.address}`);

  // const Members = await hre.ethers.getContractFactory("newDAOMember");
  // const MEMBERS = await Members.deploy(MEMBER_NFT.address);

  // await MEMBERS.deployed();

  // console.log(`MEMBERS deployed to ${MEMBERS.address}`);

  // const Grants = await hre.ethers.getContractFactory("Grants");
  // const GRANTS = await Grants.deploy(
  //   "0x6bca37d8b1707541CA67Cbc903e7E2826F99A5bb",
  //   "0xF96a451d2cBb69A83E816954BF5275DBe08Cb149"
  // );

  // await GRANTS.deployed();

  // console.log(`GRANTS deployed to ${GRANTS.address}`);

  const Whitelist = await hre.ethers.getContractFactory("Whitelist");
  const WHITELIST = await Whitelist.deploy(100);

  await WHITELIST.deployed();

  console.log(`WHITELIST deployed to ${WHITELIST.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
