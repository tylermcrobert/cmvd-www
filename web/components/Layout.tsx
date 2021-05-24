import React, { useRef } from 'react'
import styled from 'styled-components'
import { BREAKPOINT_IMAC, NAV_BAR_WIDTH, NAV_HEIGHT } from '../constants'
import { Head } from './Head'
import { SubNav } from './SubNav'

export const Layout: React.FC<{
  routeTitle: string | null
  subNav?: React.ReactNode
  isCloseButton?: boolean
  ignoreSidebar?: boolean
}> = ({
  children,
  routeTitle,
  isCloseButton = false,
  subNav,
  ignoreSidebar = false,
}) => {
  const mainRef = useRef<HTMLDivElement>(null)

  return (
    <LayoutStyle isCloseButton={isCloseButton} ignoreSidebar={ignoreSidebar}>
      <SubNav ignoreSidebar={ignoreSidebar}>{subNav}</SubNav>
      <Head title={routeTitle?.toUpperCase() || ''} />
      <main ref={mainRef}>{children}</main>
    </LayoutStyle>
  )
}

const LayoutStyle = styled.section<{
  isCloseButton: boolean
  ignoreSidebar: boolean
}>`
  main {
    padding: 1rem;
    padding-top: calc(${NAV_HEIGHT} * 2);

    @media (min-width: ${BREAKPOINT_IMAC}) {
      padding-left: ${(p) =>
        p.ignoreSidebar ? '1rem' : `calc(${NAV_BAR_WIDTH} + 2rem)`};
    }
  }
`
