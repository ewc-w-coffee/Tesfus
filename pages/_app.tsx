import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { GlobalStyle, theme } from "@styles";
import { LoginContext } from "context/LoginContext";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import axios from "axios";
import firebase from "firebase";
import Head from "next/head";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAjvZlHqrGAsuvcp014TALnBc81NB6Ave0",
    authDomain: "teefus-884db.firebaseapp.com",
    databaseURL: "https://teefus-884db-default-rtdb.firebaseio.com",
    projectId: "teefus-884db",
    storageBucket: "teefus-884db.appspot.com",
    messagingSenderId: "1091692170705",
    appId: "1:1091692170705:web:e7c4b196af6d15fdb5a4f0",
    measurementId: "G-WGBPSPG81M",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

export default function App({ Component, pageProps }: AppProps) {
  const [discordToken, setDiscordToken] = useState<string | undefined>();
  const [user, setUser] = useState<any>();
  const [isBuyer, setIsBuyer] = useState(false);
  const [inCommunity, setInCommunity] = useState(false);

  async function checkInCommunity() {
    try {
      const { data: guilds } = await axios.get(
        "https://discordapp.com/api/v6/users/@me/guilds",
        {
          headers: {
            Authorization: `Bearer ${discordToken}`,
          },
        }
      );
      setInCommunity(
        guilds.some((guild: any) => guild.name === "Teefus Community")
      );
    } catch (error) {
      setInCommunity(false);
      console.log(error);
    }
  }

  async function joinBuyersServer() {
    console.log(user + "  user");
    axios
      .put(
        `https://discordapp.com/api/v6/guilds/867247619305766912/members/${user.id}`,
        {
          access_token: discordToken,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status == 204) {
          toast.error("You are in the server already.");
        } else {
          toast.success("You have joined the Buyers Server.");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }
  async function joinCommunityServer() {
    axios
      .put(
        `https://discordapp.com/api/v6/guilds/881228508163092490/members/${user.id}`,
        {
          access_token: discordToken,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setInCommunity(true);
        if (response.status == 204) {
          toast.error("You are in the server already.");
        } else {
          toast.success("You have joined the Community Server.");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }
  async function giveBuyersRole() {
    await axios
      .put(
        `https://discordapp.com/api/v6/guilds/881228508163092490/members/${user.id}/roles/881457904153153557`,
        {
          access_token: discordToken,
        },
        {
          headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
          },
        }
      )
      .catch(() => {
        //localStorage.setItem('')
      });
  }

  async function checkIfBuyer() {
    try {
      const roles = (
        await axios.get(
          `https://discordapp.com/api/v6/guilds/881228508163092490/members/${user.id}`,
          {
            headers: {
              Authorization: `Bot ${process.env.BOT_TOKEN}`,
            },
          }
        )
      ).data.roles;
      setIsBuyer(roles.includes("881457904153153557"));
    } catch (error) {
      setIsBuyer(false);
      console.log(error);
    }
  }

  const getUser = async (token: string) => {
    try {
      const { data } = await axios.get("https://discordapp.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    } catch (error) {
      setUser(undefined);
      console.log(error);
    }
  };

  useEffect(() => {
    let localToken = localStorage.getItem("discordToken");

    console.log(localToken);

    if (localToken) {
      setDiscordToken(localToken);
      getUser(localToken);
    }
  }, []);

  useEffect(() => {
    if (user) {
      checkIfBuyer();
    }
  }, [user]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <LoginContext.Provider
          value={{
            discordToken,
            setDiscordToken,
            user,
            setUser,
            joinBuyersServer,
            giveBuyersRole,
            checkIfBuyer,
            isBuyer,
            setIsBuyer,
            joinCommunityServer,
            setInCommunity,
            inCommunity,
            checkInCommunity,
          }}
        >
          <Component {...pageProps} />
          <ToastContainer transition={Slide} position="bottom-right" />
        </LoginContext.Provider>
      </ThemeProvider>
    </>
  );
}
