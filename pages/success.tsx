import PageLayout from "@components/PageLayout";
import Head from "next/head";
import {
  SuccessContent,
  SuccessContainer,
  SuccessTitle,
  SuccessSub,
} from "./_styles/success";

const Success = () => {
  return (
    <>
      <Head>
        <title>SUCCESS</title>
      </Head>
      <PageLayout>
        <SuccessContainer>
          <SuccessContent>
            <SuccessTitle>PURCHASE SUCCESSFUL</SuccessTitle>
            <SuccessSub>
              Congratulations on your purchase. You have been added to the
              Buyers server.
            </SuccessSub>
          </SuccessContent>
        </SuccessContainer>
      </PageLayout>
    </>
  );
};

export default Success;
