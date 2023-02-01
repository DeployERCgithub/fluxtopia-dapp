import {  Web3Button, } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Mint.module.css";
import Header from "../components/Header";
import { contractAddress, contractAbi } from "../TagiABI";
import { useState } from "react";

const Mint: NextPage = () => {

  
  const  [mintClicked , setMintClicked] = useState(false);  //checking if listing button clicked and setting buttom state
  const [amount = "", setAmount] = useState<string | undefined>('');
  console.log(amount);
  const parseAmount = parseInt(amount);
  console.log(parseAmount);
  const cost = .03;  /// your nft sale price
  let total = (cost) * (parseAmount);
  console.log(total);

  return (
    <main>
    <div className={styles.container}>
      
        <img className={styles.eyelogo} src="./FluxBanner.jpg" alt="toplogo"/>
        <h1>Fluxtopias Minting DAPP</h1>
        <Header />
        <section className={styles.info}>
        <h2>Welcome to Test Mint DAPP.</h2>
        <p>Make sure to connect your wallet to be able to interact with the DAPP.</p>
        <p></p>
        </section>

        <section>Amount to Mint:
        <input className="buybutton"  
        placeholder="0" 
        type='number' name="Amount"
        value={amount} 
        onChange={(e) => setAmount(() => e.target.value)} 
        disabled={mintClicked}
        autoComplete="off"
        style={{ width: '130px', height: '30px' }}/>
        <p>Total Price: {total} ETH</p>
              <div >
                <Web3Button  className="buybutton"
                  isDisabled={mintClicked}
                  
                  contractAddress={contractAddress}
                  contractAbi={contractAbi}
                  onSubmit={() => alert("Preparing to Mint...Check your Wallet")}
                  accentColor="#15BE17"
                  action= {async (contract) => {
                    setMintClicked(true);
                   try {
                    
                    const tx = await contract.call("mint", (amount));
                    const receipt = tx.receipt; // the transaction receipt
                    const id = tx.id;
                    setMintClicked(false);
                    alert("Mint was Successful");
                  }
                  catch (error) {
                    console.error(error);
                    setMintClicked(false);
                    alert(error);
                    alert("Make sure to select a Mint amount and ensure you have enough funds");
                  }
                  }}
                  >
                   {mintClicked ? "Minting..." : "Mint a Tagi"} 
                </Web3Button></div>
                
              
        </section>
        
        <img className={styles.bottomlogo} src="./HappyTagi.jpg" alt="homelogo"/>
        
        
        </div>
        </main>
      
    
  );
};

export default Mint;

