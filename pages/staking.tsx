import { ThirdwebNftMedia, useOwnedNFTs, useContract, useAddress , Web3Button, useContractRead, useContractWrite,} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Staking.module.css";
import { BigNumber, ethers } from "ethers";
import Header from "../components/Header";
import NFTCard from "../components/NFTCard";
import { useState } from "react";
import { useEffect } from "react";


const Staking: NextPage = () => {
 
  const address = useAddress();
  const { contract: nftDropContract } = useContract(
    "0x806c24c1a66c5654e2Ead99a7832FA1Bec781a92",
    "nft-drop"
  );
  
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const { contract, isLoading } = useContract("0x634F8C4D2833Bf1A9A272d2f81e28C17F5c8Cd4F");

async function stakeNft(id: string) {
  if (!address) return;

  const isApproved = await nftDropContract?.isApproved(
    address,
    "0x634F8C4D2833Bf1A9A272d2f81e28C17F5c8Cd4F"
  );
  if (!isApproved) {
    await nftDropContract?.setApprovalForAll("0x634F8C4D2833Bf1A9A272d2f81e28C17F5c8Cd4F", true);
  }
  await contract?.call("stake", [id]);
}
  
const { data: stakedTokens } = useContractRead(
  contract,
  "getStakeInfo",
  address
);
async function withdraw(id: string) {
  await contract?.call("withdraw", [id]);
}

const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

useEffect(() => {
  if (!contract || !address) return;

  async function loadClaimableRewards() {
    const stakeInfo = await contract?.call("getStakeInfo", address);
    setClaimableRewards(stakeInfo[1]);
  }

  loadClaimableRewards();
}, [address, contract]);

const { mutateAsync: claimRewards } = useContractWrite(
  contract,
  "claimRewards"
);


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img className={styles.eyelogo} src="./FluxBanner.jpg" alt="toplogo"/>
        <h1>Fluxtopias Martketplace DAPP</h1>
        <Header />
        <p>Welcome to Fluxtopias STAKING DAPP.</p>
        <p>Make sure to connect your wallet to be able to interact with the DAPP.</p>
        <p></p>
        <p>Your Claimable Rewards <a></a> 
  {!claimableRewards
    ? "Loading..."
    : ethers.utils.formatUnits(claimableRewards, 18)}  Tokens

<Web3Button
  
  action={ async() => {
    claimRewards([])
    try {
      
    } 
    catch (error) {
      console.error(error);
          alert(error);
      
    }
    }}
    contractAddress={"0x634F8C4D2833Bf1A9A272d2f81e28C17F5c8Cd4F"}
>
  Claim Rewards
</Web3Button>
</p>
        <div>
  {stakedTokens &&
    stakedTokens[0]?.map((stakedToken: BigNumber) => (
      <NFTCard tokenId={stakedToken.toNumber()} key={stakedToken.toString()} />
    ))}
</div>

        <div>
    {ownedNfts?.map((nft) => (
    <div key={nft.metadata.id.toString()}>
      <ThirdwebNftMedia metadata={nft.metadata} />
      <h3>{nft.metadata.name}</h3>
      <Web3Button
        contractAddress={"0x634F8C4D2833Bf1A9A272d2f81e28C17F5c8Cd4F"}
        action={async() => {
          stakeNft(nft.metadata.id);
        try {
          
        } 
        catch (error) {
          console.error(error);
          alert(error);
          
        }}}
        
      >
        Stake
        
      </Web3Button>
    </div>
  ))}
</div>


      </main>
  </div>
  );
};

export default Staking;

