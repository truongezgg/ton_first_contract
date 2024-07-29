import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl =
  "https://raw.githubusercontent.com/truongezgg/ton_first_contract/main/manifest.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
