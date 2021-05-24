import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

import { client, SanityImage, urlFor } from "../lib/sanity";

const OVERVIEW_SLUG = "overview";

const getThumbnail = (img: SanityImage) => {
  const THUMB_IMAGE_WIDTH = 960;
  const imageUrl = urlFor(img).width(THUMB_IMAGE_WIDTH).url() || "";
  return imageUrl;
};

const Home: NextPage<{
  data: {};
}> = ({ data }) => {
  console.log(data);

  return <div>homepage here</div>;
};

export async function getServerSideProps() {
  const data = await client.fetch(`*[]`);

  return {
    props: { data },
  };
}

export default Home;
