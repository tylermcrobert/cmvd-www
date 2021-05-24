import { NextPage, GetServerSideProps } from 'next'
import { Layout } from '../../components/Layout'
import { client, SanityImage, urlFor } from '../../lib/sanity'
import { ProjectGrid } from '../../components/ProjectSideScroll'

const Info: NextPage<{
  slug: string
  projectData: {
    title?: string
    images: SanityImage[]
  }
}> = ({ projectData }) => (
  <Layout
    ignoreSidebar
    isCloseButton
    routeTitle={projectData.title || 'No Title'}
    subNav={projectData.title}
  >
    <ProjectGrid
      imageUrls={projectData.images.map(
        (image) => urlFor(image).width(1920).url() || ''
      )}
    />
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug?.toString() || ''

  const projectData = await client.fetch(
    `*[_type == 'collection' && slug.current == '${slug}'][0]`
  )

  if (!projectData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slug,
      projectData,
    },
  }
}

export default Info
