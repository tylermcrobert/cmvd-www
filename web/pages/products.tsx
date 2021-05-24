/**
 * 🛍 PRINTS STORE PAGE 🛒
 */

import { NextPage } from 'next'
import Client from 'shopify-buy'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { ProductThumbnail } from '../components/ProductThumbnail'
import { StoreGrid } from '../components/StoreGrid'
import {
  FilterLink,
  NavigationFilterLinks,
} from '../components/NavigationFilterLinks'

const Home: NextPage<{
  // products: Client.Product[]
  collections: (Client.Collection & { products: Client.Product[] })[]
}> = ({ collections }) => {
  const [currentNavHandle, setCurrentNavHandle] = useState<string>(
    collections[0].handle
  )

  const products =
    collections.find((collection) => collection.handle === currentNavHandle)
      ?.products || []

  const data = collections.find(
    (collection) => collection.handle === currentNavHandle
  )

  if (!data) return null

  return (
    <Layout
      routeTitle="Store"
      subNav={
        <NavigationFilterLinks>
          {collections.map((collection) => (
            <FilterLink
              title={collection.title}
              slug={collection.handle}
              key={collection.handle}
              onClick={() => setCurrentNavHandle(collection.handle)}
              isCurrent={collection.handle === currentNavHandle}
            />
          ))}
        </NavigationFilterLinks>
      }
    >
      <StoreGrid>
        {products.map((product) => {
          const prices = product.variants.map((variant) => variant.price)
          const handle = (product as any).handle as string

          return (
            <ProductThumbnail
              key={product.id}
              title={product.title}
              price={`$${prices[0]}`}
              imgUrl={product.images[0].src}
              handle={handle}
            />
          )
        })}
      </StoreGrid>
    </Layout>
  )
}

// Initializing a client
export const shopifyClient = Client.buildClient({
  storefrontAccessToken: 'a641150bebc3d0f1b2f12af0a7945df9',
  domain: 'nick-lavecchia-editions.myshopify.com',
})

export async function getServerSideProps() {
  // Fetch all products in your shop
  const products = await shopifyClient.product.fetchAll()
  const collections = await shopifyClient.collection.fetchAllWithProducts()

  const colleectionsWidthProducts = collections.map((collection) => ({
    ...collection,
    products: JSON.parse(JSON.stringify(collection.products)),
  }))

  return {
    props: {
      collections: JSON.parse(JSON.stringify(colleectionsWidthProducts)),
      products: JSON.parse(JSON.stringify(products)),
    }, // will be passed to the page component as props
  }
}

export default Home
