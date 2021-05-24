import { NextPage } from "next";
import { HomepageLayout } from "../components/HomepageLayout";
import { HomepageProject } from "../components/HomepageProject";
import { Title } from "../components/Title";
import { SITE_NAME } from "../constants";
import { client, SanityImage } from "../lib/sanity";

export type ProjectData = {
  images: SanityImage[];
  location: string | null;
  roles: string[];
  title: string;
  year: string;
};

const Home: NextPage<{
  data?: Partial<ProjectData>[];
}> = ({ data }) => {
  return (
    <HomepageLayout>
      <aside>
        <h1>{SITE_NAME}</h1>
        <ul>
          <li>Information</li>
          <li>Index</li>
        </ul>
        <ul>
          {data?.map((project) => (
            <li>
              <Title
                title={project.title || "Title"}
                year={project.year || null}
                location={project.location || null}
              />
            </li>
          ))}
        </ul>
      </aside>

      <main>
        <ul>
          {data?.map((project) => (
            <HomepageProject
              year={project.year || ""}
              title={project.title || "title"}
              images={project.images || []}
              location={project.location || null}
              roles={project.roles || []}
            />
          ))}
        </ul>
      </main>
    </HomepageLayout>
  );
};

export async function getServerSideProps() {
  const data = await client.fetch(`*[_type == 'project']`);

  return {
    props: { data },
  };
}

export default Home;
