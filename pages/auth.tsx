// @ts-nocheck
import { useRouter } from "next/router";
import { AuthContainer } from "./_styles/auth";
import qs from "query-string";
import { useContext, useEffect } from "react";
import { LoginContext } from "context/LoginContext";
import axios from "axios";
import { toast } from "react-toastify";

const Auth = () => {
  const router = useRouter();
  const { setDiscordToken, setUser } = useContext(LoginContext);

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
      getUser(data.access_token);
      router.push("/");
      toast.success("You have successfully logged in.");
    } catch (error) {
      router.push("/");
      toast.error("Failed to log you in. Try again!");
    }
  };

  useEffect(() => {
    if (router.query.code) {
      getToken(router.query.code);
    } else {
      router.push("/");
    }
  }, [router.isReady]);

  return <AuthContainer>Logging in...</AuthContainer>;
};

export default Auth;
