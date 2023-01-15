import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";

const Header: React.FC = () => {
    const router = useRouter();

    return (
    <div className={styles.container}>
        <div>
        <img className={styles.eyelogo} src="./Fluxtopia.png" alt="toplogo"/>
            <Link legacyBehavior href={"/"}>
                <a className={router.pathname == "/" ? styles.active : styles.link}>
                    Home
                    </a>
            </Link><Link legacyBehavior href={"/mint"}>
            <a className={router.pathname == "/mint" ? styles.active : styles.link}>
                Mint
                </a>
            </Link>
            <Link legacyBehavior href={"/listednfts"}>
            <a className={router.pathname == "/listednfts" ? styles.active : styles.link}>
                Listed NFTs
                </a>
            </Link>
            <Link legacyBehavior href={"/my-nfts"}>
            <a className={router.pathname == "/my-nfts" ? styles.active : styles.link}>
                Your Nfts
                </a>
            </Link>
            
        </div>
        <ConnectWallet colorMode="light" accentColor="#05f30d"/>
    </div>
    )
;
};

export default Header;