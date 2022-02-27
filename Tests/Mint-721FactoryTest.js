// /* eslint-disable prettier/prettier */
// const { ethers } = require("hardhat");
// const { use } = require("chai");
// const { expect } = require("chai");
// const { solidity } = require("ethereum-waffle");
// const Web3 = require('web3');
// // const toBN = Web3.utils.toBN;
// // use(solidity);


// describe("MarketPlace Mint ERC721 Contract Unit Test", function() {
//   it("Should interact with the Rewards, ERC721 and Mint contracts.", async function() {
//     before((done) => {
//       setTimeout(done, 2000);
//     });
//     const [testDao, testDev, userAddress] = await ethers.getSigners();

//     const RoleProvider = await ethers.getContractFactory("MarketRoleProvider");
//     const roleProvider = await RoleProvider.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//     await roleProvider.deployed();
//     const roleProviderAddress = roleProvider.address;
//     console.log("Role provider Address is: ", roleProviderAddress);

//     const MarketOwnerProxy = await ethers.getContractFactory("OwnerProxy");
//     const ownerProxy = await MarketOwnerProxy.deploy(roleProviderAddress);
//     await ownerProxy.deployed();
//     const ownerProxyAddress = ownerProxy.address;
//     console.log("Market Owner Proxy address is: " + ownerProxyAddress);

//     const NFTMarket = await ethers.getContractFactory("NFTMarket");
//     const market = await NFTMarket.deploy(roleProviderAddress);
//     await market.deployed()
//     const marketAddress = market.address; 
//     console.log("Market Address: " + marketAddress)

//     const MarketMint = await ethers.getContractFactory("Mint");
//     const marketMint = await MarketMint.deploy(roleProviderAddress);
//     await marketMint.deployed();
//     const marketMintAddress = marketMint.address;
//     console.log("Market Mint Address: " + marketMintAddress)

//     /// Test ERC20 token!! This is not used on mainnet!
//     const PHAMToken = await ethers.getContractFactory("PhamToken");
//     const token = await PHAMToken.deploy('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
//     await token.deployed()
//     const tokenAddress = token.address;
//     console.log("PHAM Token Address: " + tokenAddress)
//     const amnt = await token.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
//     console.log("Deployer address has a total of " + amnt.toNumber() + " PHAM Tokens.");

//     const NFT = await ethers.getContractFactory("PhamNFTs");
//     const phamNft = await NFT.deploy('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', marketMintAddress, "https://ipfs.io/ipfs/");
//     await phamNft.deployed()
//     const phamNftContractAddress = phamNft.address;
//     console.log("PhamNFTs Contract Address: "+ phamNftContractAddress)

//     const MarketBids = await ethers.getContractFactory("MarketBids");
//     const marketBids = await MarketBids.deploy(roleProviderAddress);
//     await marketBids.deployed();
//     const marketBidsAddress = marketBids.address;
//     console.log("Bids Address: " + marketBidsAddress)
  
//     const MarketCollections = await ethers.getContractFactory("MarketCollections");
//     const marketCollections = await MarketCollections.deploy(roleProviderAddress);
//     await marketCollections.deployed();
//     const marketCollectionsAddress = marketCollections.address;
//     console.log("CollectionsAddress: " + marketCollectionsAddress)
  
//     const MarketOffers = await ethers.getContractFactory("MarketOffers");
//     const marketOffers = await MarketOffers.deploy(roleProviderAddress);
//     await marketOffers.deployed();
//     const marketOffersAddress = marketOffers.address;
//     console.log("Offers Address: " + marketOffersAddress)
  
//     const MarketTrades = await ethers.getContractFactory("MarketTrades");
//     const marketTrades = await MarketTrades.deploy(roleProviderAddress);
//     await marketTrades.deployed();
//     const marketTradesAddress = marketTrades.address;
//     console.log("Trades Address: " + marketTradesAddress)

//     const RewardsController = await ethers.getContractFactory("RewardsControl");
//     const rewardsController = await RewardsController.deploy(roleProviderAddress, tokenAddress)
//     await rewardsController.deployed();
//     const rewardsControllerAddress = rewardsController.address;
//     console.log("Rewards Controller address is: ", rewardsControllerAddress);

//     // Initializing all the addresses in the Role Provider
//     await roleProvider.setDaoAdd(testDao.address);
//     await roleProvider.setMarketAdd(marketAddress);
//     await roleProvider.setMarketMintAdd(marketMintAddress);
//     await roleProvider.setCollectionsAdd(marketCollectionsAddress);
//     await roleProvider.setOffersAdd(marketOffersAddress);
//     await roleProvider.setTradesAdd(marketTradesAddress);
//     await roleProvider.setBidsAdd(marketBidsAddress);
//     await roleProvider.setRwdsAdd(rewardsControllerAddress);
//     await roleProvider.setRoleAdd(roleProviderAddress);
//     await roleProvider.setOwnerProxyAdd(ownerProxyAddress);
//     await roleProvider.setPhunkyAdd(tokenAddress);
//     await roleProvider.setDevSigAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//     await roleProvider.setNftAdd(phamNftContractAddress);
//     console.log("Initialized all the contract addresses to the Owner Proxy contract and assigned Contract_Role.")
//     await roleProvider.grantRole("0x0000000000000000000000000000000000000000000000000000000000000000",ownerProxyAddress);
//     await ownerProxy.setProxyRole("0x51b355059847d158e68950419dbcd54fad00bdfd0634c2515a5c533288c7f0a2","0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
//     const address = await testDev.getAddress();
//     const balance = await ethers.provider.getBalance(address);
//     const eth = ethers.utils.formatEther(balance);
//     console.log(address, eth);
    
//     await marketMint.setNewRedemption(200, tokenAddress);
//     await marketMint.fetchRedemptionTokens().then(async(ack) =>{
//       expect(await ack[0].redeemAmount.toNumber() === 200)
//     })
//     await marketCollections.setTokenList([true], [tokenAddress])
//     await token.approve(marketMintAddress, 1000)
//     await marketMint.redeemForNft(1, 200, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
//     .then(async(res)=>{
//         console.log(res)
//       })

//     // Verifying the item struct and data is saved correctly
//     await marketMint.fetchNFTsCreated().then(async(res)=>{
//       expect(await res[0].itemId.toNumber() === 1);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//       expect(await res[0].itemId.toNumber() === 2);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//       expect(await res[0].itemId.toNumber() === 3);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//       expect(await res[0].itemId.toNumber() === 4);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//       expect(await res[0].itemId.toNumber() === 5);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//     });

//     await marketMint.fetchNFTsCreatedByAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266").then(async(res)=>{
//       expect(await res[0].itemId.toNumber() === 1);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//       expect(await res[0].itemId.toNumber() === 2);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//       expect(await res[0].itemId.toNumber() === 3);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//       expect(await res[0].itemId.toNumber() === 4);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//       expect(await res[0].itemId.toNumber() === 5);
//       expect(await res[0].creator === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
//     })
//     await rewardsController.fetchUserRewardTokens().then(async(res)=>{
//       console.log(res[0].tokenId.toNumber())
//       console.log(res[0].tokenAmount.toNumber())
//       console.log(res[0].tokenAddress)
//     })
//     await rewardsController.fetchDevRewardTokens().then(async(res)=>{
//       console.log(res[0].tokenId.toNumber())
//       console.log(res[0].tokenAmount.toNumber())
//       console.log(res[0].tokenAddress)
//     })
//     await rewardsController.fetchDaoRewardTokens().then(async(res)=>{
//       console.log(res[0].tokenId.toNumber())
//       console.log(res[0].tokenAmount.toNumber())
//       console.log(res[0].tokenAddress)
//     })

// })})
