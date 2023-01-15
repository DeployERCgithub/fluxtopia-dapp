import { useActiveListings, MediaRenderer, useContract, useNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/ListedNfts.module.css";
import { BigNumber } from "ethers";
import Header from "../components/Header";
import { useState } from "react";


const ListedNfts: NextPage = () => {
  const { contract } = useContract(
    '0x11D752691a9A1fE2F0B64C6d7b67DC1a1fe90017',
    'marketplace')

  const {data: nfts, isLoading} = useActiveListings(contract);
  const [buyingClicked, setBuyingClicked] = useState(false);
  

  
      

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img className={styles.eyelogo} src="./FluxBanner.jpg" alt="toplogo"/>
      
        <h1>Fluxtopias Martketplace DAPP</h1>
        <Header />
        
                <h2>NFTs Listed for Sale</h2>
                <div className="buybuttongrid"></div>

        {!isLoading ? (
          <div className="imagebox">
            {nfts && nfts.map((nft) => {
              return (
               <div key={nft.asset.image}>
                 <MediaRenderer                 
                  src={nft.asset.image}
                  height="200px"
                  width="200"
                />
                <p>{nft.asset.name}</p>
                <p>{nft.asset.description}</p>
                <p></p> 
                <div className="break"></div>
                <p>Token ID:{nft.asset.id} </p>              
                <p>Contract:</p>
                <p>{nft.assetContractAddress}</p>
                

                <p>Current Owner:</p>
                <p>{nft.sellerAddress}</p>
                <p>{}</p>

                
                <button className="buybutton"  disabled={buyingClicked} onClick={async  () => {

                  setBuyingClicked(true);
                  try {

                   await contract?.buyoutListing(BigNumber.from(nft.id), 1);
                   setBuyingClicked(false);
                   alert("Successfully bought NFT");
                  } 
                  catch (error) {
                    console.error(error);
                    alert(error);
                    setBuyingClicked(false);
                    alert("Make sure your Wallet is connected and you have enough funds");
                      
                  }
                
                }}
                >
                {buyingClicked ? "Buying..." : "Buy Now"} <embed  hidden={!buyingClicked} src="./Loading.gif" />
                </button>
                <p>Price: {nft.buyoutCurrencyValuePerToken.displayValue}<s></s> {nft.buyoutCurrencyValuePerToken.symbol}<s></s><s></s></p>
                <div className="buybuttongrid"></div>
                
                
              
              </div>
              )
            })}

          </div>
        ) : (
          <div>Gathering Active Listings...</div>
        )


        
      
      }

        
      </main>
    </div>
  );
};

export default ListedNfts;

