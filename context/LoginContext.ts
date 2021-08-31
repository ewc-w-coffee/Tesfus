import { createContext, Dispatch, SetStateAction } from "react";

export const LoginContext = createContext<{
  discordToken?: string | undefined;
  setDiscordToken?: Dispatch<SetStateAction<string | undefined>>;
  user?: any;
  setUser?: Dispatch<any>;
  joinBuyersServer?: any;
  giveBuyersRole?: any;
  checkIfBuyer?: any;
  isBuyer?: any;
  setIsBuyer?: any;
  joinCommunityServer?: any;
  setInCommunity?: any;
  inCommunity?: any;
  checkInCommunity?: any;
}>({});
