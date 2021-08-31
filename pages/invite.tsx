import Head from "next/head";
import axios from "axios";

interface Props {
  data: any;
}

const Invite = ({ data }: Props) => {
  return (
    <>
      <Head>
        <meta
          property="og:site_name"
          content="YOU'VE BEEN INVITED TO JOIN A SERVER"
        />
        <meta property="og:title" content="Teefus Community" />
        <meta property="og:image" content="/img/Logo.jpg" />
        <meta
          property="og:description"
          content={`Meet a variety of new people and stay comfortable in our friendly environment. Make new friends and hangout with us. We host events and giveaways every week so stayed tuned for those.

⬤ ${data.online} Online  ⭘ ${data.total} Members`}
        />
      </Head>
    </>
  );
};

export async function getServerSideProps() {
  const API = "https://teefus.com/api/v2/members";
  const { data } = await axios.get(API);

  return { props: { data } };
}

export default Invite;
