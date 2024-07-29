import { TonConnectButton } from "@tonconnect/ui-react";
import "./App.css";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";

// EQDIIsKaNy6ZiymOePonfvaIADmFwfBgy5wKL_Swi3TG-SDa

function App() {
  const {
    contract_address,
    contract_balance,
    counter_value,
    sendIncrement,
    sendDeposit,
    sendWithDrawRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>Our contract Address</b>
          <div className="Hint">{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className="Hint">{contract_balance?.toString()}</div>
        </div>

        <div className="Card">
          <b>Counter</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        {connected && (
          <a
            onClick={async () => {
              await sendIncrement();
            }}
          >
            Increment by 5
          </a>
        )}
        <br />
        {connected && (
          <a
            onClick={async () => {
              await sendDeposit();
            }}
          >
            Deposit 1 TON
          </a>
        )}
        <br />
        {connected && (
          <a
            onClick={async () => {
              await sendWithDrawRequest();
            }}
          >
            Withdraw 0.7 TON
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
