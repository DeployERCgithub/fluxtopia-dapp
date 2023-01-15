
import type { NextPage } from "next";
import styles from "../styles/MyNfts.module.css";
import Header from "../components/Header";
import { ThirdwebNftMedia, useAddress, useContract, useNFTs, useActiveListings, MediaRenderer} from "@thirdweb-dev/react";
import { useState } from "react";



const MyNfts: NextPage = () => {
  const { contract } = useContract("0x806c24c1a66c5654e2Ead99a7832FA1Bec781a92",); //Add The Contract you want to look up of Owner
  /** @type {import("@thirdweb-dev/react").Contract} */
  const { contract: marketplace} = useContract("0x11D752691a9A1fE2F0B64C6d7b67DC1a1fe90017", "marketplace",); //Marketplace Address
  const address = useAddress();
  const {data: nfts, isLoading} = useNFTs(contract);
  const {data: listednfts} = useActiveListings(marketplace);
  const [price = "", setPrice] = useState<string | undefined>('');           // Listing price from inputed price
  const [currency = 0, setCurrency] = useState<string | undefined>('');   //gets currency picked from selector to list for
  console.log(marketplace);
  console.log(currency);
  const priceInput = parseFloat(price);  // parsing Listing price from inputed price
  const newPrice = isNaN(priceInput) ? 0 : priceInput;
  console.log(price); 
   //number to send to contract to set selling price
  
  console.log(nfts);console.log(listednfts);
  const  [listingClicked , setListingClicked] = useState(false);  //checking if listing button clicked and setting buttom state
  const  [cancelListingClicked , setCancelListingClicked] = useState(false);   //checking if Cancel listing button clicked and setting buttom state



  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <img className={styles.eyelogo} src="./FluxBanner.jpg" alt="toplogo"/>
        
        <h1>Fluxtopias Martketplace DAPP</h1>
        <Header />
        <h2>Your NFTs</h2>
        <p>List of NFTs you own that can be listed on the marketplace.</p>
        <section className={styles.info}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            
            nfts
            ?.filter(nft => nft.owner == address)   // filters to only show NFTs(OWNED) matching connected wallets address - remove to show all nfts in the collection
            ?.map((nft) => {
              return (
                <div key={nft.metadata.id}>
                  <ThirdwebNftMedia
                  metadata={nft.metadata}
                  height="200"
                  style={{ borderRadius: "10px"}}/>
                  <p>{nft.metadata.name}</p>
                  <p>Token Info:</p>
                  <p>{nft.type} Token Id:{nft.metadata.id}</p>
                  <p></p>
                <div className="buybuttongrid">Sell Price:
                 <input placeholder="Price to list for Ex. 0.08" type='number' name="price"value={price} onChange={(e) => setPrice(() => e.target.value)} autoComplete="off"/>
                 
                 <select  onChange={(e) => setCurrency(() => e.target.value)}> 
                <option value="" selected>Choose Token</option>                                                          
                <option value= '0x0cB05C085Df4c7db915Bc600e00827f70DBeDD32' >Test Coin</option>
                <option value= '0x0000000000000000000000000000000000000000' >ETH</option>
                </select>


                <button className="buybutton"                 //buybutton after input of price and selecting currency to list for
                        disabled={listingClicked}
                        onClick={async  () => {

                          setListingClicked(true);
                  try {
                  
                  const listing = {
                                    // address of the NFT contract the asset you want to list is on
                                    assetContractAddress: "0x806c24c1a66c5654e2Ead99a7832FA1Bec781a92",
                                    // token ID of the asset you want to list
                                    tokenId: (nft.metadata.id),
                                  // when should the listing open up for offers
                                    startTimestamp: new Date(),
                                    // how long the listing will be open for
                                    listingDurationInSeconds: 86400,
                                    // how many of the asset you want to list
                                    quantity: 1,
                                    // address of the currency contract that will be used to pay for the listing
                                    currencyContractAddress: (currency),
                                    // how much the asset will be sold for
                                    buyoutPricePerToken: (newPrice),
                                  }  
                  console.log(marketplace);                
                  const tx =  await marketplace.direct.createListing(listing);
                  const receipt = tx.receipt; // the transaction receipt
                  const id = tx.id; // the id of the newly created listing
                  
                  setListingClicked(false);
                  alert("Listing Successful");
                  } 
                  catch (error) {
                    console.error(error);
                    alert(error); 
                    setListingClicked(false);
                    alert("Make sure you have entered a price and have choosen a Token to list NFT for.")
                    
                  }
                
                }}
                >
                {listingClicked ? "Listing..." : "Create Listing"}<embed  hidden={!listingClicked} src="./Loading.gif" />
                </button>
                
                </div>
                </div>
                
              )
            })
          )}

        
        

        {!isLoading ? (
          
            
            
            
listednfts
            ?.filter(nft2 => nft2.sellerAddress == address)
            ?.map((nft2) => {
              return (
               <div key={nft2.id}>
                 <MediaRenderer                 
                  src={nft2.asset.image}
                  height="200px"
                  width="200"
                />
                <p>{nft2.asset.name}</p>
                <p>{nft2.asset.description}</p>
                <p></p> 
                <div className="break"></div>
                <p>Token ID:{nft2.asset.id} </p>              
                <p>Contract:</p>
                <p>{nft2.assetContractAddress}</p>
                

                <p>Current Owner:</p>
                <p>{nft2.sellerAddress}</p>
                <p>{}</p>

                <div className="buybuttongrid">
                <button className="buybutton" 
                disabled={cancelListingClicked}
                onClick={async  () => {

                  setCancelListingClicked(true);
                  try {

                  const tx =  await marketplace.direct.cancelListing(nft2.id);
                  const receipt = tx.receipt; // the transaction receipt
                  const id = tx.id; // the id of the newly created listing
                  setCancelListingClicked(false);
                  alert("Successfully canceled listing.");
                  } catch (error) {
                    console.error(error);setCancelListingClicked(false);
                    alert(error); 
                      
                  }
                
                }}
                >
                {cancelListingClicked ? "Canceling Listing..." : "Cancel Listing"}<embed  hidden={!cancelListingClicked} src="./Loading.gif" />
                </button>
                <p>Price: {nft2.buyoutCurrencyValuePerToken.displayValue}<s></s> {nft2.buyoutCurrencyValuePerToken.symbol}<s></s><s></s></p>
                </div>
                
                
              
              </div>
              )
            }))

          
         : (
          <div>Gathering Active Listings...</div>
        )


        
      
      }

        
        </section>
        
      </main>
    </div>
  );
};

export default MyNfts;


