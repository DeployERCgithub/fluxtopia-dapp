import {  Web3Button, } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Mint.module.css";
import Header from "../components/Header";

const Note: NextPage = () => {
 

  

  return (
    <div className={styles.container}>
      
        <img className={styles.eyelogo} src="./FluxBanner.jpg" alt="toplogo"/>
        <h1>Fluxtopias Martketplace DAPP</h1>
        <Header />
        <section className={styles.info}>
        <h2>Welcome to Test Mint DAPP.</h2>
        <p>Make sure to connect your wallet to be able to interact with the DAPP.</p>
        <p></p>
        <div>
        <Web3Button 
          contractAddress="0x806c24c1a66c5654e2Ead99a7832FA1Bec781a92"
          action={(contract) => { contract.erc721.claim(1);
          }}
          >
            Mint
        </Web3Button></div>
        
        </section>
        <img className={styles.bottomlogo} src="./HappyTagi.jpg" alt="homelogo"/>

        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Open Form
</button>



      


      
    </div>
  );
};

export default Note;

