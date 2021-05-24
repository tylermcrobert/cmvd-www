import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { SmallTextStyle } from './SmallTextStyle'

export const ProductThumbnail: React.FC<{
  imgUrl: string
  title: string
  price: string
  handle: string
  oldPrice?: string
}> = ({ imgUrl, title, handle }) => (
  <ProductThumbnailStyle>
    <Link href={`/products/${handle}`}>
      <a>
        <img src={imgUrl} alt="Product Thumbnail" />
        <SmallTextStyle as="h3">{title}</SmallTextStyle>
      </a>
    </Link>
  </ProductThumbnailStyle>
)

const ProductThumbnailStyle = styled.section`
  p {
    margin: 0;
    margin-bottom: 1rem;
  }

  img {
    width: 100%;
    margin-bottom: 0.85rem;
    height: auto;
  }
`
