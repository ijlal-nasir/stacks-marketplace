import { authenticate, UserData } from "@stacks/connect";
import React, { useState, useEffect } from "react";
import { appDetails, userSession } from "../../pages/_app";
import styles from "./ConnectWallet.module.css";

const ConnectWallet = () => {
  const [stacksUser, setStacksUser] = useState<UserData>();

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setStacksUser(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setStacksUser(userSession.loadUserData());
    }
  }, [userSession]);

  const signInWithStacks = () => {
    authenticate({
      appDetails,
      onFinish: ({ userSession }) => setStacksUser(userSession.loadUserData()),
    });
  };

  const signOut = () => {
    userSession.signUserOut();
    location.reload();
  };

  return (
    <>
      {stacksUser ? (
        <>
          <p className={styles.walletConnected}>
            Connected: {stacksUser.profile.stxAddress.testnet}
          </p>
          <button className={styles.connectWalletButton} onClick={signOut}>
            Logout
          </button>
        </>
      ) : (
        <button
          className={styles.connectWalletButton}
          onClick={signInWithStacks}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default ConnectWallet;
