# Welcome to PeerSCI platform 🔬 🌐 💡

PeerSCI empowers scientific collaboration by offering a decentralized platform for researchers to share findings, apply for grants, and engage in peer review. Utilizing blockchain technology, it fosters transparency, open access to research, and community-driven funding, revolutionizing scientific discovery.

<img width="579" alt="Screenshot 2024-03-05 at 8 24 06 PM" src="https://github.com/kushagrasarathe/bnbchain-hackathon/assets/91938348/e4eb0765-b73e-44c4-8ede-602275cb60c4">

# Inspiration 
We embarked on the journey to build PeerSCI with a vision to empower the research and scientific community by providing them with a decentralized platform for collaboration and knowledge sharing. Recognizing the lack of a robust platform in the Web3 space catering specifically to researchers and scientists, we aimed to fill this gap and create a unique ecosystem where individuals passionate about science can connect, collaborate, and contribute to the advancement of knowledge.

We have been working on this project for the past 3-4 weeks to build something of value for the scientist and researcher community.

### **1. Open Access to Scientific Data and Publications** <br/>
PeerSCI aims to promote open access to scientific data and publications in a decentralised manner, ensuring that valuable research findings are accessible to the global scientific community and the general public.

### **2. Crowdsourced Peer-Review** <br/>
PeerSCI facilitates crowdsourced peer-review, allowing researchers to receive feedback and validation from their peers, enhancing the quality and credibility of scientific research. All the entry and grant proposals are reviewed and voted on by the Peers ,who are part of the DAO

### **3. Decentralized Funding of Scientific Research** <br/>
Through decentralized funding mechanisms, PeerSCI enables researchers to secure funding for their projects directly from the community, reducing reliance on traditional funding sources and fostering innovation.

# What it does 
PeerSCI serves as a decentralized hub where researchers and scientists can join as DAO members, share their research, apply for grants, and engage in peer-to-peer collaboration. The platform facilitates a transparent and community-driven approach to research, allowing members to submit proposals for entry, grants, and research publications. Through decentralized governance and voting mechanisms, members collectively decide on the approval of proposals and the allocation of funds.

Once a researcher becomes a DAO member, they receive a member NFT, granting them access to publish their research on IPFS via the platform's `/publish` page. The published research is then accessible to anyone on the internet through the /explore page, fostering open access to scientific knowledge.

Additionally, PeerSCI encourages contributions from the general audience by allowing them to support research projects financially. Contributors receive a contributor NFT as a token of appreciation for their contribution. The funds collected through contributions are used to finance grants requested by members for new research initiatives.

Reaserchers can apply for the grants directly from their `/dashboard` by filling up a form ,which will create a grant proposal in the contract ,on which DAO Members can vote 

# How we built it
As a team of two members, we collectively designed and developed PeerSCI from scratch, leveraging our diverse skill sets to bring the project to life.

**Kushagra Sarathe**: Led the frontend development and design using Next.js, CSS, and JavaScript.
**Dhruv Agarwal**: Focused on smart contract development and enhancement, ensuring the integrity and functionality of the platform's frontend.

The frontend was developed using Next.js, CSS, and JavaScript, providing a responsive and user-friendly interface for seamless interaction with the platform.

PeerSCI's backend infrastructure is powered by BNB Smart Chain, IPFS, and Chainlink. Smart contracts, written in Solidity, were thoroughly tested and deployed on the BNB Smart Chain Testnet using Hardhat and Alchemy as node providers.

Integration with BNB Smart chain from the frontend was achieved using JavaScript, Wagmi.js, and Ethers.js. Wallet connectivity was facilitated through Rainbow-Kit, enhancing user experience and accessibility.

PeerSCI's NFTs, including member NFTs and contributor NFTs, were minted on the BNB Smart Chain Testnet and are soul-bound tokens, non-transferable, and can only be burnt and minted.

`contracts` - [/contracts](https://github.com/kushagrasarathe/bnbchain-hackathon/tree/main/contracts)
<br/>
`frontend` - [/frontend](https://github.com/kushagrasarathe/bnbchain-hackathon/tree/main/frontend)

# 🧑‍💻Technologies Used 🤖

**BNB Smart Chain testnet** : All of our smart contracts are deployed on th BNB Smart chain testnet and so our infrastructure and interactions run on Polygon. Total 5 of them are there , that manages all the backend code including DAO , Voting, grants, Researches and members. Interaction with the contracts is done with help of wagmi.js and ethers.js . Testing is done well for all the contracts , to ensure they are secured and working properly.
- [Grants Contract](https://testnet.bscscan.com/address/0xDD6662f373f8BD7150f072BC2dCF4b24Ab942b67)
- [DAO Funds Contract](https://testnet.bscscan.com/address/0x9D0CF5672A4FFfaa6BA58DB070Ae1Da8D0F130af)
- [Members Contract](https://testnet.bscscan.com/address/0x95b7dD6016aa284720DE1a2ef6acaae6afab8F90)
- [Contributor NFT contract](https://testnet.bscscan.com/address/0x3C3b0f18071716140cc1139e04a9bCf9Aa7284B2) 
- [Member NFT Contract](https://testnet.bscscan.com/address/0xa2484Ed60a4e9458BbAe7eFE12c1d25394D97450)

*Pinata IPFS* : Utilized for decentralized storage of all data, including user profiles, grant requests, and research publications, on IPFS.

*Chainlink Keepers*: Employed for automated governance processes, including closing voting rounds for member and grant requests, ensuring smooth operation and integrity of the ecosystem.

- [Member Contract keeper](https://automation.chain.link/bnb-chain-testnet/2778059989491363846783753651950428386877791283278505080907472850518416657168)
- [Grants Contract keeper](https://automation.chain.link/bnb-chain-testnet/63457390810262199224027835803786444542526242183017067097854650391566355471133)

# Flow Of the application ✨

<img width="858" alt="Screenshot 2024-03-05 at 9 44 20 PM" src="https://github.com/kushagrasarathe/bnbchain-hackathon/assets/91938348/5f4ad002-58c2-46f0-90e4-141633dfdcb8">

## Grant Proposal Flow 
1. User can directly contribute and donate to the DAO pool , and earn a contributor status
2. These funds in the DAO pool are then used for the grants process
3. Users can also directly donate or reward researcher for a particular research 

4. Researchers who are also DAO members are allowed to create Grant proposal for a research they are seeking grant for with all the info
5. Then a Proposal is created and put under vote by the other DAO members , for a period of 7 days
6. DAO members can then cast their vote by approving and denying the proposal right from their dashbaord 
7. At the end of the voting , Chainlink Keeper automatically closes the proposal by checking the votes and alloting the grant directly 
   to a grantee if approved
   
## User Entry Flow

1. There is an initial committee of DAO members who have the power to vote and add new members to the DAO
2. New researchers wishing to enter the DAO , create a new entry proposal with details about themselves and the researches 
   they have carried out , to present a credible profile
3. After the creation of proposal , the Current DAO members vote on the proposal on whether to approve the new researcher to enter the DAO 
   or not ,which is open for a period of 2 days
4. Later , the chainlink Keeper automatically closes the proposal , by calculating the results and minting the DAO member NFT to the particular 
   researcher if majority votes in favour

# Authors

- [Dhruv-2003](https://github.com/Dhruv-2003)
- [kushagrasarathe](https://github.com/kushagrasarathe)

# Next Steps 🚀

PeerSCI is committed to continuous improvement and expansion. Future developments may include enhancing user experience, integrating additional features such as decentralized peer review, and exploring partnerships to further support scientific research and collaboration.
