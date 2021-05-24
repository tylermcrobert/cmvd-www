import { NextPage } from "next";
import { client } from "../lib/sanity";

const Home: NextPage<{
  data: {};
}> = ({ data }) => {
  console.log(data);

  return (
    <div>
      homepage here<pre>{JSON.stringify(data)}</pre>
    </div>
  );
};

export async function getServerSideProps() {
  const data = await client.fetch(`*[]`);

  return {
    props: { data },
  };
}

export default Home;
