import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App";
import "./normalize.css";
import "./colores.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-altmzbyipx5l7eow.us.auth0.com"
      clientId="FFJAoCs7NM0SEnaokqs4n65rdmGd6XZF"
      redirectUri={window.location.origin}
    >
      <App/>
    </Auth0Provider>
  </React.StrictMode>
);