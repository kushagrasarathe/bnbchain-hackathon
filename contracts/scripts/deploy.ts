import { ethers } from "hardhat";

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");

  // const Lock = await ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

  const funds = await ethers.getContractFactory("DAOFunds");
  const FUNDS = await funds.deploy();

  await FUNDS.deployed();

  console.log(`DAO FUNDS deployed to ${FUNDS.address}`);

  const MemberNFT = await ethers.getContractFactory("MemberNFT");
  const metadata =
    "ipfs://bafkreifxtpdf5lcmkqjqmpe4wjgfl4rbov23ryn5merejridxk27pfzufq";
  const MEMBER_NFT = await MemberNFT.deploy(metadata);

  await MEMBER_NFT.deployed();

  console.log(`MEMBER_NFT deployed to ${MEMBER_NFT.address}`);

  const ContributorNFT = await ethers.getContractFactory("ContributorNFT");
  const newMetadata =
    "ipfs://bafybeibz4dfk6zxsorvq5xiul7ncwuytfewpjchmhr5kf3scimst7vaete/metadata.json";
  const CONTRIBUTOR_NFT = await ContributorNFT.deploy(
    newMetadata,
    FUNDS.address
  );

  await CONTRIBUTOR_NFT.deployed();

  console.log(`CONTRIBUTOR_NFT deployed to ${CONTRIBUTOR_NFT.address}`);

  const Members = await ethers.getContractFactory("newDAOMember");
  const MEMBERS = await Members.deploy(MEMBER_NFT.address);

  await MEMBERS.deployed();

  console.log(`MEMBERS deployed to ${MEMBERS.address}`);

  const Grants = await ethers.getContractFactory("Grants");
  const GRANTS = await Grants.deploy(MEMBER_NFT.address, FUNDS.address);

  await GRANTS.deployed();

  console.log(`GRANTS deployed to ${GRANTS.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
