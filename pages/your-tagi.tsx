
import type { NextPage } from "next";
import styles from "../styles/MyNfts.module.css";
import Header from "../components/Header";
import { ThirdwebNftMedia, useAddress, useContract, useNFTs, useActiveListings, MediaRenderer} from "@thirdweb-dev/react";
import { contractAddress, contractAbi } from "../TagiABI";


const YourTagi: NextPage = () => {
  const { contract } = useContract(contractAddress); //Add The Contract you want to look up of Owner
  /** @type {import("@thirdweb-dev/react").Contract} */
 
  const address = useAddress();
  const {data: nfts, isLoading} = useNFTs(contract);
  console.log(nfts)
  
 
  
  


  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <img className={styles.eyelogo} src="./FluxBanner.jpg" alt="toplogo"/>
        
        <h1>Fluxtopias DAPP</h1>
        <Header />
        <h2>Your NFTs</h2>
        <p></p>
        <section className={styles.info}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            
            nfts
            ?.filter(nft => nft.owner == address)   // filters to only show NFTs(OWNED) matching connected wallets address - remove to show all nfts in the collection
            ?.map((nft) => {
              return (
                <div className="buybutton" key={nft.metadata.id}>
                  <ThirdwebNftMedia
                  metadata={nft.metadata}
                  height="200"
                  style={{ borderRadius: "10px"}}/>
                  <p>{nft.metadata.name}</p>
                  
                  <p>{nft.type} Token Id:{nft.metadata.id}</p>
                  <p></p>
                
                
                </div>
                
                
              )
            })
          )}

        
        

        

        
        </section>
        
      </main>
    </div>
  );
};

export default YourTagi;


