import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { BREAKPOINT_IMAC } from '../constants'
import { useImageUrlSize } from '../hooks/useImageUrlSize'
import { SmallTextStyle } from './SmallTextStyle'

/**
 * Project Card
 * @returns a simple gallery thumbnail
 * @todo i think this shouldn't probably fetch the image url twice...
 */

export const ProjectThumbnail: React.FC<{
  name: string
  slug: string
  imageUrl: string
  indexToStart?: number
}> = ({ name, slug, imageUrl, indexToStart = null }) => {
  const { direction } = useImageUrlSize(imageUrl)

  console.log(indexToStart)

  return (
    <Link
      href={
        indexToStart !== null
          ? `/projects/${slug}?start=${indexToStart}`
          : `/projects/${slug}`
      }
    >
      <ProjectThumbnailStyle isPortrait={direction === 'PORTRAIT'}>
        <div>
          <img src={imageUrl} alt={name} />
        </div>
        {name && <SmallTextStyle as="h3">{name}</SmallTextStyle>}
      </ProjectThumbnailStyle>
    </Link>
  )
}

const SIZE_DESKTOP = 16
const SIZE_IMAC = 16
const PORTRAIT_RATIO_CORRECTION = 0.6

const ProjectThumbnailStyle = styled.div<{ isPortrait: boolean }>`
  display: block;
  cursor: pointer;

  h3 {
    font-weight: inherit;
    padding-top: 0.5rem;

    @media (min-width: 768px) {
      height: 3rem;
    }
  }

  @media (min-width: 768px) {
    width: ${(p) =>
      p.isPortrait
        ? `${SIZE_DESKTOP * PORTRAIT_RATIO_CORRECTION}vw`
        : `${SIZE_DESKTOP}vw`};
  }
  @media (min-width: ${BREAKPOINT_IMAC}) {
    width: ${(p) =>
      p.isPortrait
        ? `${SIZE_IMAC * PORTRAIT_RATIO_CORRECTION}vw`
        : `${SIZE_IMAC}vw`};
  }
`
