import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { HomeFeed } from "../components/HomeProjectGrid";
import { ProjectThumbnail } from "../components/HomeProjectThumbnail";
import { Layout } from "../components/Layout";
import { client, SanityImage, urlFor } from "../lib/sanity";
import {
  FilterLink,
  NavigationFilterLinks,
} from "../components/NavigationFilterLinks";

const OVERVIEW_SLUG = "overview";

const getThumbnail = (img: SanityImage) => {
  const THUMB_IMAGE_WIDTH = 960;
  const imageUrl = urlFor(img).width(THUMB_IMAGE_WIDTH).url() || "";
  return imageUrl;
};

const Home: NextPage<{
  data: {};
}> = ({ data }) => {
  const overviewImgs = data.overview;
  const categories = [...(data.categories || [])];
  const router = useRouter();
  const slug = router.query.filter || OVERVIEW_SLUG;
  const [currentCategorySlug, setCurrentCategorySlug] = useState(slug);

  const currentCategory = categories?.find(
    (cat) => cat.slug === currentCategorySlug
  );

  return (
    <Layout
      routeTitle={null}
      subNav={
        <NavigationFilterLinks>
          <FilterLink
            onClick={() => setCurrentCategorySlug(OVERVIEW_SLUG)}
            isCurrent={currentCategorySlug === OVERVIEW_SLUG}
            key={OVERVIEW_SLUG}
            slug={OVERVIEW_SLUG}
            title="Overview"
          />
          {categories?.map((category) => (
            <FilterLink
              onClick={() => setCurrentCategorySlug(category.slug)}
              isCurrent={category.slug === currentCategorySlug}
              key={category.slug}
              slug={category.slug || "unknown"}
              title={category.title || " Unknown Title"}
            />
          ))}
        </NavigationFilterLinks>
      }
    >
      <HomeFeed>
        {currentCategorySlug === OVERVIEW_SLUG &&
          overviewImgs.map((img, i) => (
            <ProjectThumbnail
              name=""
              key={img._key}
              slug="overview"
              imageUrl={getThumbnail(img)}
              indexToStart={i}
            />
          ))}
        {currentCategory?.projects?.map((project, i) => (
          <ProjectThumbnail
            name={project.title || "Untitled Project"}
            key={project._id}
            slug={project?.slug?.current || "<blank-slug>"}
            imageUrl={getThumbnail(project.featured)}
          />
        ))}
      </HomeFeed>
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await client.fetch(`
    *[_type  == 'site'][0]{
      'overview': overview->images,
      categories[]-> {
        'slug': slug.current,
        title,
        'projects': collections[]->
        }
    }
  `);

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Home;
