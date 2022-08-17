import React from "react";
import {
  makeSTXTokenTransfer,
  broadcastTransaction,
  AnchorMode,
} from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";
import styles from "./BuyNowButton.module.css";
import { getUserData } from "@stacks/connect";

type Props = {
  amount: number;
};

const BuyNowButton: React.FC<Props> = ({ amount }) => {
  const buyNow = async (amount: number) => {
    const stacksUserData = await getUserData();

    console.log("stacksPerson", stacksUserData);

    const senderKey: string = String(stacksUserData?.appPrivateKey);

    const network = new StacksTestnet();

    const recipientAddr = String(process.env.NEXT_PUBLIC_RECIPIENT_ADDR);

    console.log("recipientAddr", recipientAddr);

    const txOptions = {
      recipient: recipientAddr,
      amount: amount,
      senderKey: senderKey,
      network: network,
      memo: "test memo",
      anchorMode: AnchorMode.Any,
    };

    const transaction = await makeSTXTokenTransfer(txOptions);

    // to see the raw serialized tx
    const serializedTx = transaction.serialize().toString("hex");

    console.log("serializedTx", serializedTx);

    const broadcastResponse = await broadcastTransaction(transaction);

    console.log("broadcastResponse", broadcastResponse);

    const txId = broadcastResponse.txid;

    console.log("txId", txId);
  };

  return (
    <button className={styles.buyNowButton} onClick={() => buyNow(amount)}>
      Buy Now ({amount} STX)
    </button>
  );
};

export default BuyNowButton;
