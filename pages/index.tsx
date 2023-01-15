import { MediaRenderer, useActiveListings, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { BigNumber } from "ethers";
import Header from "../components/Header";

const Home: NextPage = () => {
 
 
  

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img className={styles.eyelogo} src="./FluxBanner.jpg" alt="toplogo"/>
        <h1>Fluxtopias Martketplace DAPP</h1>
        <Header />
        <p>Welcome to Fluxtopias DAPP.</p>
        <p>Make sure to connect your wallet to be able to interact with the DAPP.</p>
        <p></p>
        <img className={styles.bottomlogo} src="./HappyTagi.jpg" alt="homelogo"/>
      </main>
  </div>
  );
};

export default Home;

