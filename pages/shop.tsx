import PageLayout from "@components/PageLayout";
import Head from "next/head";
import {
  NoStockContainer,
  NoStockContent,
  NoStockSub,
  NoStockTitle,
  PayPal,
  Price,
  ShopContainer,
  ShopContent,
  Stock,
} from "./_styles/shop";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoginContext } from "context/LoginContext";
import firebase from "firebase";
import Link from "next/link";
import router from "next/router";

const Shop = () => {
  const db = firebase.firestore();
  const {
    user,
    giveBuyersRole,
    joinBuyersServer,
    isBuyer,
    setIsBuyer,
    checkIfBuyer,
    inCommunity,
    checkInCommunity,
  } = useContext(LoginContext);

  const [disabled, setDisabled] = useState(!user);

  const [maxCopies, setMaxCopies] = useState<number | undefined>();
  const [copies, setCopies] = useState<number | undefined>();

  useEffect(() => {
    getStock();
  }, []);

  useEffect(() => {
    setDisabled(!user);

    if (user) {
      checkIfBuyer();
      checkInCommunity();
    }
  }, [user]);

  async function getStock() {
    await db
      .collection("receipts")
      .doc("info")
      .get()
      .then((doc) => {
        const data = doc.data();
        setMaxCopies(data?.stock);
        setCopies(data?.left);
      });
  }

  async function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async (details: any) => {
      router.push("/success");
      giveBuyersRole();
      joinBuyersServer();

      setIsBuyer(true);

      const db = firebase.firestore();

      db.collection("receipts").add({
        id: details.id,
        method: "PayPal",
        name: details.payer.name.given_name,
        email: details.payer.email_address,
        discord: `${user.id}`,
      });

      if (copies) {
        db.collection("receipts")
          .doc("info")
          .update({
            left: copies - 1,
          });

        getStock();
      }
    });
  }

  async function onClick() {
    if (disabled) {
      toast.error("You must log in to purchase.");
    } else if (isBuyer) {
      toast.error("You are already a buyer.");
    } else if (!inCommunity) {
      toast.error("Must join the Community Server to purchase.");
    }
  }

  async function onCancel() {
    toast.info("The purchase was cancelled.");
  }

  async function onError() {
    toast.info("An unexpected error has occured. Try again!");
  }

  return (
    <PageLayout>
      <Head>
        <title>SHOP</title>
        <meta
          name="description"
          content="Explore the products we have for sale and purchase them."
        />
        <meta property="og:site_name" content="THE REALM OF TEEFUS" />
        <meta property="og:url" content="https://teefus.com/shop" />
        <meta property="og:title" content="SHOP" />
        <meta
          property="og:description"
          content="Explore the products we have for sale and purchase them."
        />
      </Head>
      {copies !== undefined && copies > 0 && (
        <ShopContainer>
          <ShopContent>
            <Price>30 USD</Price>
            {copies && maxCopies && (
              <Stock>
                {copies} / {maxCopies}
              </Stock>
            )}
            <PayPal>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AQW-Hk90rKRbjVBnyzO4jvaWNedV68tISOKnIbqJJBYsPTAS9gvN0VpFEj6mb0vBPd-7ZU3TPBcHQF9h",
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  forceReRender={[disabled, copies, isBuyer, inCommunity]}
                  onClick={onClick}
                  disabled={disabled || isBuyer || !inCommunity}
                  onError={onError}
                  onApprove={onApprove}
                  onCancel={onCancel}
                  style={{ color: "blue", label: "buynow", height: 55 }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "30",
                          },
                        },
                      ],
                    });
                  }}
                />
              </PayPalScriptProvider>
            </PayPal>
          </ShopContent>
        </ShopContainer>
      )}
      {copies !== undefined && copies === 0 && (
        <NoStockContainer>
          <NoStockContent>
            <NoStockTitle>Out of stock!</NoStockTitle>
            <NoStockSub>
              Check again later when we are in stock. Join the{" "}
              <Link href="/invite">
                <a>
                  <span>Community Discord</span>
                </a>
              </Link>{" "}
              for updates regarding stock.
            </NoStockSub>
          </NoStockContent>
        </NoStockContainer>
      )}
    </PageLayout>
  );
};

export default Shop;
