import {
  LoginBtn,
  NavBox,
  NavContainer,
  NavContent,
  NavItem,
  NavLogo,
  ProfileModal,
  ProfileModalItem,
  RightContainer,
  UserBox,
  UserImg,
  UserName,
} from "./styles";
import Link from "next/link";
import DiscordIcon from "../../public/img/discord.svg";
import { useRouter } from "next/router";
import qs from "query-string";
import { useContext, useEffect } from "react";
import { LoginContext } from "context/LoginContext";
import { useState } from "react";

const NavBar = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const {
    setDiscordToken,
    user,
    setUser,
    checkIfBuyer,
    isBuyer,
    joinBuyersServer,
    joinCommunityServer,
  } = useContext(LoginContext);

  useEffect(() => {
    if (user) {
      checkIfBuyer();
    }
  }, [user]);

  const genDiscordUrl = () => {
    const query = {
      client_id: process.env.CLIENT_ID,
      scope: ["identify", "guilds", "guilds.join"].join(" "),
      response_type: "code",
      redirect_uri: process.env.REDIRECT_URI,
    };

    return qs.stringifyUrl({
      url: "https://discordapp.com/api/oauth2/authorize",
      query: query,
    });
  };

  const logout = () => {
    localStorage.removeItem("discordToken");
    if (setDiscordToken) {
      setDiscordToken(undefined);
    }
    if (setUser) {
      setUser(undefined);
    }

    setShowModal(false);
  };

  return (
    <NavContainer>
      <NavContent>
        <NavBox>
          {showModal && (
            <ProfileModal>
              {isBuyer && (
                <ProfileModalItem onClick={joinBuyersServer}>
                  Buyers Server
                </ProfileModalItem>
              )}
              <ProfileModalItem onClick={joinCommunityServer}>
                Community Server
              </ProfileModalItem>
              <ProfileModalItem onClick={logout}>Logout</ProfileModalItem>
            </ProfileModal>
          )}
          <Link href="/">
            <a>
              <NavLogo src="/img/logo.svg" />
            </a>
          </Link>
          <Link href="/shop">
            <a>
              <NavItem className={router.pathname == "/shop" ? "active" : ""}>
                Shop
              </NavItem>
            </a>
          </Link>
          <RightContainer>
            {!user && (
              <Link href={genDiscordUrl()}>
                <a>
                  <LoginBtn>
                    <DiscordIcon />
                    <span>Login</span>
                  </LoginBtn>
                </a>
              </Link>
            )}
            {user && (
              <UserBox onClick={() => setShowModal(!showModal)}>
                <UserName>
                  {user.username}#{user.discriminator}
                </UserName>
                <UserImg
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                />
              </UserBox>
            )}
          </RightContainer>
        </NavBox>
      </NavContent>
    </NavContainer>
  );
};

export default NavBar;
