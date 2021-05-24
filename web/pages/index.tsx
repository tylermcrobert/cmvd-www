import { NextPage } from "next";
import { SITE_NAME } from "../constants";
import { client, urlFor } from "../lib/sanity";

type ProjectData = {
  date?: string;
  images?: {}[];
  location?: string;
  roles?: string[];
  title: string;
};

const Home: NextPage<{
  data?: ProjectData[];
}> = ({ data }) => {
  console.log(data);

  return (
    <>
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
            <li>
              {project.images?.map((image) => {
                const url = urlFor(image).width(1440).url();
                if (url) return <img src={url} />;
              })}
              {project.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const data = await client.fetch(`*[_type == 'project']`);

  return {
    props: { data },
  };
}

export default Home;
