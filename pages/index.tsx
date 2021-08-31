// @ts-nocheck
import { Button } from "@components/Button";
import Head from "next/head";
import PageLayout from "@components/PageLayout";
import Link from "next/link";
import {
  HomeBtns,
  HomeContent,
  HomeLinks,
  HomeLogo,
  HomeMain,
  HomeTitle,
} from "./_styles";
import YoutubeIcon from "../public/img/youtube.svg";
import RobloxIcon from "../public/img/roblox.svg";
import DiscordIcon from "../public/img/discord.svg";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import axios from "axios";
import qs from "query-string";
import { LoginContext } from "context/LoginContext";
import { toast } from "react-toastify";

const Home = () => {
  const router = useRouter();
  const { user, setDiscordToken, isBuyer, joinBuyersServer } =
    useContext(LoginContext);

  const getToken = async (code: any) => {
    try {
      const body = qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
        code: code,
      });

      const { data } = await axios.post(
        "https://discordapp.com/api/oauth2/token",
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("discordToken", data.access_token);
      setDiscordToken(data.access_token);
      toast.success("You have successfully logged in.");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.code) {
      getToken(router.query.code);
    }
  }, [router.isReady]);

  const checkBuyer = () => {
    return isBuyer && user;
  };

  const checkNotBuyer = () => {
    return !isBuyer || !user;
  };

  return (
    <PageLayout>
      <Head>
        <title>HOME</title>
        <meta
          name="description"
          content="Delve into The Realm of Teefus, a place unlike anything you've ever imagined before."
        />
        <meta property="og:site_name" content="THE REALM OF TEEFUS" />
        <meta property="og:url" content="https://teefus.com/" />
        <meta property="og:title" content="HOME" />
        <meta
          property="og:description"
          content="Enter a place unlike anything you've ever imagined before."
        />
      </Head>
      <HomeMain>
        <HomeContent>
          <HomeTitle
            typeSpeed={250}
            strings={["Teefus"]}
            backSpeed={150}
            backDelay={1000}
            loop
          />
          <HomeLinks>
            <a
              href="https://www.youtube.com/channel/UCs4a-5psjoTq7UVo6kDuQ9Q"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeIcon />
            </a>
            <a
              href="https://www.roblox.com/users/502205855/profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RobloxIcon />
            </a>
            <Link href="/invite">
              <a>
                <DiscordIcon />
              </a>
            </Link>
          </HomeLinks>
          <HomeBtns>
            {checkNotBuyer() && (
              <>
                <Link href="/shop">
                  <Button>Buy now</Button>
                </Link>
                <Button variant="secondary">Learn more</Button>
              </>
            )}
            {checkBuyer() && (
              <>
                <Link href="/">
                  <Button>Dashboard</Button>
                </Link>
                <Button onClick={joinBuyersServer} variant="secondary">
                  Buyers Server
                </Button>
              </>
            )}
          </HomeBtns>
        </HomeContent>
        <HomeLogo src="/img/logo.svg" />
      </HomeMain>
    </PageLayout>
  );
};

export default Home;
