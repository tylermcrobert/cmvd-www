/* eslint-disable react/no-danger */
import { NextPage, GetServerSideProps } from 'next'
import Client, { ProductVariant } from 'shopify-buy'
import { ChangeEvent, useState } from 'react'
import atob from 'atob'
import { Layout } from '../../components/Layout'
import { shopifyClient } from '../products'
import { ProductInformation } from '../../components/ProductPage'

const getVariantIdNumber = (base64String: string) =>
  parseFloat(atob(base64String).split('/ProductVariant/')[1])

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

const Info: NextPage<{
  handle: string
  productData: Client.Product
}> = ({ productData }) => {
  const [currentVariant, setCurrentVariant] = useState({
    data: productData.variants[0],
    shopifyNumberId: getVariantIdNumber(productData.variants[0].id.toString()),
  })

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentVariant({
      data: productData.variants.find(
        (variant) => variant.id === e.target.value
      ) as ProductVariant,
      shopifyNumberId: getVariantIdNumber(e.target.value),
    })
  }

  return (
    <Layout
      isCloseButton
      routeTitle={productData.title}
      subNav={null}
      ignoreSidebar
    >
      <ProductInformation
        price={formatter.format(parseFloat(currentVariant.data.price))}
        isSoldOut={!currentVariant.data.available}
        currentVariantId={currentVariant.shopifyNumberId}
        currentVariantTitle={currentVariant.data.title}
        variants={
          productData.variants.length > 1 && (
            <select onChange={handleChange}>
              {productData.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.title}
                </option>
              ))}
            </select>
          )
        }
        media={
          <div>
            {productData.images.map((img) => (
              <img src={img.src} alt="Product" key={img.src} />
            ))}
          </div>
        }
        title={productData.title}
        description={
          <div
            dangerouslySetInnerHTML={{
              __html: (productData as any).descriptionHtml,
            }}
          />
        }
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const handle = params?.handle?.toString() || ''

  const productData: Client.Product | undefined =
    await shopifyClient.product.fetchByHandle(handle)

  if (!productData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      handle,
      productData: JSON.parse(JSON.stringify(productData)),
    },
  }
}

export default Info
