import { NextPage } from "next";
import { HomepageLayout } from "../components/HomepageLayout";
import { HomepageProject } from "../components/HomepageProject";
import { SITE_NAME } from "../constants";
import { client, SanityImage } from "../lib/sanity";

export type ProjectData = {
  date: string;
  images: SanityImage[];
  location: string | null;
  roles: string[];
  title: string;
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
              {project.title} (
              {project.location &&
                project.date &&
                `${project.location} ${new Date(project.date).getFullYear()}`}
              )
            </li>
          ))}
        </ul>
      </aside>

      <main>
        <ul>
          {data?.map((project) => (
            <HomepageProject
              date={project.date || ""}
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
