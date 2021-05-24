import React, { useState } from 'react'
import styled from 'styled-components'
import { NAV_HEIGHT } from '../constants'
import { Icon } from './Icon'

export const ProductInformation: React.FC<{
  media: React.ReactNode
  title: string
  description: React.ReactNode
  variants: React.ReactNode | null
  currentVariantId: number
  isSoldOut: boolean
  price: string
  currentVariantTitle: string
}> = ({
  media,
  title,
  description,
  variants,
  currentVariantTitle,
  isSoldOut = true,
}) => {
  const [isDescriptionShown, setIsDescriptionShown] = useState(false)

  const toggleDescription = () => setIsDescriptionShown((s) => !s)

  const subjectLine = `Purchase Inquiry – ${title} (${currentVariantTitle})`

  return (
    <ProductInformationStyle>
      <MainImage>{media}</MainImage>

      <section className="infoSection">
        <h1>{title}</h1>

        {variants && (
          <div className="variants">
            {variants} <Icon type="CARRAT" />
          </div>
        )}

        <div className="description">
          <button
            type="button"
            className="desc-toggle"
            onClick={toggleDescription}
          >
            {isDescriptionShown ? '－' : '＋'} Description
          </button>
        </div>

        {isDescriptionShown && (
          <div className="descriptionInner">{description}</div>
        )}

        {isSoldOut ? (
          <span className="sold-out">Sold Out</span>
        ) : (
          <a
            href={`mailto:nick@nicklavecchia.com?subject=${subjectLine}`}
            target="_blank"
            rel="noreferrer"
          >
            Contact for Print ↗
          </a>
        )}
      </section>
      <MainImage mobile>{media}</MainImage>
    </ProductInformationStyle>
  )
}

const ProductInformationStyle = styled.section`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: ${NAV_HEIGHT};
  }

  .infoSection {
    height: auto;
    padding-bottom: ${NAV_HEIGHT};
    line-height: 1.75;

    * {
      align-self: flex-start;
    }

    a {
      border-bottom: 1px solid var(--color-primary);
    }
  }
  .descriptionInner {
    font-size: 0.8rem;
    margin-top: 1rem;

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin-bottom: 1rem;
      margin-top: 1rem;
      font-weight: bold;
    }
  }

  .desc-toggle {
    cursor: pointer;
    user-select: none;
  }

  .sold-out {
    opacity: 0.5;
    cursor: not-allowed;
  }

  h1 {
    font-weight: 400;
    margin-bottom: 0;
  }
`

const MainImage = styled.div<{ mobile?: boolean }>`
  overflow: hidden;
  margin-bottom: 1rem;

  display: ${(p) => (p.mobile ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-start;

  img {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
    object-position: top center;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    display: ${(p) => (p.mobile ? 'none' : 'flex')};
    img {
      width: 100%;
      height: auto;
    }
  }
`
