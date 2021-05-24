import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import Flickity from 'react-flickity-component'
import styled from 'styled-components'

const SCROLL_THRESHOLD_NEXT = 300
const RESET_DURATION_MS = 700

export const ProjectGrid: React.FC<{
  imageUrls: string[]
}> = ({ imageUrls = [] }) => {
  const router = useRouter()
  const flickityRef = useRef<Flickity | null>(null)
  const startingIndex = router.query.start
    ? parseFloat(router.query.start.toString())
    : 0

  useEffect(() => {
    let count = 0
    let isResetting = false
    const isMouse = matchMedia('(pointer:fine)').matches

    const resetCount = () => {
      isResetting = true
      setTimeout(() => {
        count = 0
        isResetting = false
      }, RESET_DURATION_MS)
    }
    const handleScroll = (e: Event) => {
      if (!isMouse) return
      if (isResetting) return
      resetCount()
      const event: WheelEvent = e as WheelEvent
      const distance = event.deltaY || event.deltaX
      count += distance

      if (count < 0) {
        flickityRef.current?.previous()
      } else if (count <= SCROLL_THRESHOLD_NEXT) {
        flickityRef.current?.next()
      }
    }

    window.addEventListener('mousewheel', handleScroll)

    return () => {
      window.removeEventListener('mousewheel', handleScroll)
    }
  }, [])

  return (
    <FlickityStyle
      options={{
        freeScroll: true,
        lazyLoad: 2,
        initialIndex: startingIndex,
        freeScrollFriction: 0,
      }}
      flickityRef={(ref) => {
        flickityRef.current = ref
      }}
    >
      {imageUrls.map((url) => (
        <img src={url} key={url} alt="gallery" />
      ))}
    </FlickityStyle>
  )
}

const FlickityStyle = styled(Flickity)`
  position: fixed;
  top: 0;
  bottom: 0;

  outline: none;
  height: 100vh;

  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  padding-top: 8rem;
  padding-bottom: 14rem;

  @media (min-width: 768px) {
    padding-bottom: 8rem;
  }

  cursor: ew-resize;

  overflow: hidden;

  img {
    height: calc(100vh - 16rem);
    width: auto;
    margin-right: 8vw;
    max-height: 95vw;
    max-width: 95vw;
    object-fit: contain;
  }

  .flickity-viewport {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`
