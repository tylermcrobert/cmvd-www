import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { useImageUrlSize } from '../hooks/useImageUrlSize'
import { SmallTextStyle } from './SmallTextStyle'

/**
 * Project Card
 * @returns a simple gallery thumbnail
 * @todo i think this shouldn't probably fetch the image url twice...
 */

export const ProjectCard: React.FC<{
  name: string
  slug: string
  imageUrl: string
}> = ({ name, slug, imageUrl }) => {
  const { direction } = useImageUrlSize(imageUrl)

  return (
    <Link href={`/projects/${slug}`}>
      <ProjectCardStyle isPortrait={direction === 'PORTRAIT'}>
        <div>
          <img src={imageUrl} alt={name} />
        </div>
        <SmallTextStyle as="h3">{name}</SmallTextStyle>
      </ProjectCardStyle>
    </Link>
  )
}

const SIZE_DESKTOP = 20
const PORTRAIT_RATIO_CORRECTION = 0.8

const ProjectCardStyle = styled.div<{ isPortrait: boolean }>`
  display: block;
  margin: 0.5rem;
  cursor: pointer;

  width: ${(p) =>
    p.isPortrait
      ? `${SIZE_DESKTOP * PORTRAIT_RATIO_CORRECTION}vw`
      : `${SIZE_DESKTOP}vw`};

  h3 {
    font-weight: inherit;
    height: 3rem;
    padding-top: 0.5rem;
  }
`
