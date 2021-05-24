import { NextPage } from 'next'
import styled from 'styled-components'
import blocksToHtml from '@sanity/block-content-to-html'
import { Layout } from '../components/Layout'
import { SmallTextStyle } from '../components/SmallTextStyle'
import { client as sanityClient } from '../lib/sanity'
import { SanityBlockContent } from '../types'

const Info: NextPage<{
  data: {
    info: {
      bio: SanityBlockContent
      clients: string[]
      contactMethods: {
        _key: string
        label: string
        url: string
        value: string
      }[]
    }
  }
}> = ({ data }) => {
  return (
    <Layout routeTitle="Info" subNav="Bio">
      <Wrapper>
        <section>
          <BioBlock
            dangerouslySetInnerHTML={{
              __html: blocksToHtml({ blocks: data.info.bio }),
            }}
          />
        </section>

        <aside>
          <h2>
            <SmallTextStyle>Clients</SmallTextStyle>
          </h2>
          <List>
            {data.info.clients.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </List>
        </aside>
        <aside>
          <h2>
            <SmallTextStyle>Contact</SmallTextStyle>
          </h2>
          <List>
            {data.info.contactMethods.map((method) => (
              <a
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                key={method._key}
              >
                <li>
                  {method.label} &#8594; {method.value}
                </li>
              </a>
            ))}
          </List>
        </aside>
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  /* margin-bottom: 4rem; */ /* margin-top: 4rem; */
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;

  > :first-child {
    grid-column: span 2;
  }
`

const List = styled.ul`
  li {
    margin-bottom: 0.25rem;
  }
`

const BioBlock = styled.div`
  margin-bottom: 2rem;
`
export async function getServerSideProps() {
  const data = await sanityClient.fetch(`
    *[_type  == 'site'][0] {
      info
    }
  `)

  return {
    props: { data }, // will be passed to the page component as props
  }
}
export default Info
