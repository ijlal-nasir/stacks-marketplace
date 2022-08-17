import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  AppConfig,
  AuthOptions,
  Connect,
  UserSession,
} from "@stacks/connect-react";

export const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export const appDetails = {
  name: "Superfandom",
  icon: "https://app.sigle.io/icon-192x192.png",
};
const authOptions: AuthOptions = {
  redirectTo: "/",
  appDetails,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Connect authOptions={authOptions}>
      <Component {...pageProps} />;
    </Connect>
  );
}

export default MyApp;
