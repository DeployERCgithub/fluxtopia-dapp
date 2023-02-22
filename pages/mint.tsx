import {  Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";

import type { NextPage } from "next";
import styles from "../styles/Mint.module.css";
import Header from "../components/Header";
import { contractAddress, contractAbi } from "../TagiABI";
import { useState } from "react";
import { ethers } from "ethers";


const Mint: NextPage = () => {

  
 

  const { contract } = useContract("0x2154A126511A836bBc7760d35b6e11Cb11436fF1"); //TAGI Contract
  const { data: claimedNFTSupply } = useContractRead(contract, "totalSupply");  //Gets total nfts claimed so far
  const { data: unclaimedNFTSupply } = useContractRead(contract, "maxSupply");  //Gets total amount of claimable NFTs


  const  [mintClicked , setMintClicked] = useState(false);  //checking if listing button clicked and setting buttom state
  const [amount = "", setAmount] = useState<string | undefined>('');
  console.log(amount);
  const parseAmount = parseInt(amount);
  console.log(parseAmount);
  const cost = .009;  /// your nft sale price
  const total = (cost) * (parseAmount);
  console.log(total);

  let newCost = (total+"")



  return (
    <main>
    <div className={styles.container}>
      
        <img className={styles.eyelogo} src="./FluxBanner.jpg" alt="toplogo"/>
        <h1>Fluxtopias Minting DAPP</h1>
        <Header />
        <section className={styles.info}>
        <h2>TAGI Mint</h2>
        <p>Make sure to connect your wallet to be able to interact with the DAPP.</p>
        <br></br>
        <img className={styles.bottomlogo} src="./preview.jpg" alt="homelogo"/>
        <p> Total Minted             {claimedNFTSupply?.toNumber()} / {" "}
        {(unclaimedNFTSupply?.toNumber() || 0)} </p>
        <p>Mint Price: {cost} ETH</p>
        
        </section>

        <section><h1>Amount to Mint:</h1>
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
                    
                    const tx = await contract.call("mint",amount,{
                      // override default gas limit
                      value: ethers.utils.parseEther(newCost), // send ether with the contract call
                     });
                    const receipt = tx.receipt;
                    
                    setMintClicked(false);
                    alert("Mint was Successful")
                  }
                  catch (error) {
                    console.error(error);
                    setMintClicked(false);
                    alert(error);
                    alert("Make sure to select a Mint amount and ensure you have enough funds");
                  }
                  }}
                  >
                   {mintClicked ? "Minting..." : "MINT TAGI"} 
                </Web3Button></div>
                
              
        </section>
        <br></br>
        <img className={styles.bottomlogo} src="./HappyTagi.jpg" alt="homelogo"/>
        
        
        </div>
        </main>
      
    
  );
};

export default Mint;

