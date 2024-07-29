import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export function useMainContract() {
  const client = useTonClient();
  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
  }>();
  const [balance, setBalance] = useState<null | bigint>(BigInt(0));
  const { sender } = useTonConnect();

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse("EQDIIsKaNy6ZiymOePonfvaIADmFwfBgy5wKL_Swi3TG-SDa") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const val = await mainContract.getData();
      const balance = await mainContract.getBalance();
      setContractData({
        counter_value: val.counter_value,
        recent_sender: val.recent_sender,
        owner_address: val.owner_address,
      });
      setBalance(balance);
      await sleep(5_000); // sleep for 5 seconds and then get the value again
      getValue();
    }
    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    ...contractData,
    sendIncrement: async () => {
      if (!mainContract) return;
      return await mainContract.sendIncrement(
        sender,
        toNano("0.05"),
        BigInt(5)
      );
    },
    sendDeposit: async () => {
      if (!mainContract) return;
      return await mainContract.sendDeposit(sender, toNano("1"));
    },
    sendWithDrawRequest: async () => {
      if (!mainContract) return;
      return await mainContract.sendWithdrawRequest(
        sender,
        toNano("0.1"),
        toNano("0.7")
      );
    },
  };
}
