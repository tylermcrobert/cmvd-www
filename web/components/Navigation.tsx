import styled from 'styled-components'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import {
  BREAKPOINT_IMAC,
  NAV_HEIGHT,
  SITE_NAME,
  Z_INDEX_NAV_MAIN,
} from '../constants'
import { NavigationLinks } from './NavigationLinks'
import { smallTextStyle } from './SmallTextStyle'
import { FilterCtx } from '../pages/_app'

export type NavigationRouteId = 'HOME' | 'STORE' | 'INFO' | 'PROJECT'

type Props = {
  isCloseButton: boolean
}

export const Navigation = React.forwardRef<HTMLDivElement, Props>(
  ({ isCloseButton }, ref) => {
    const router = useRouter()
    const ctx = useContext(FilterCtx)
    /**
     * Handle Close Button
     */
    const handleCloseButton = () => {
      const isProjectsSubRoute = router.route.split('/projects').length !== 1
      const isStoreSubroute = router.route.split('/products').length !== 1

      if (isProjectsSubRoute) {
        router.push(
          ctx.lastActiveFilter ? `/?filter=${ctx.lastActiveFilter}` : '/'
        )
      }

      if (isStoreSubroute) {
        router.push(
          ctx.lastActiveFilter
            ? `/products/?filter=${ctx.lastActiveFilter}`
            : '/products/'
        )
      }
    }

    return (
      <NavigationStyle ref={ref}>
        <Link href="/">
          <LogoStyle>{SITE_NAME}</LogoStyle>
        </Link>

        {isCloseButton ? (
          <CloseButtonWrapper>
            <button type="button" onClick={handleCloseButton}>
              <CloseButton>×</CloseButton>Close
            </button>
          </CloseButtonWrapper>
        ) : (
          <NavigationLinks />
        )}
      </NavigationStyle>
    )
  }
)

const CloseButtonWrapper = styled.div`
  button {
    display: flex;
    align-items: center;
  }
`

const CloseButton = styled.div`
  font-size: 130%;
  margin-right: 0.2rem;
`

const NavigationStyle = styled.nav`
  position: absolute;
  top: 0;

  width: 100%;
  padding: 0 1rem;
  z-index: ${Z_INDEX_NAV_MAIN};

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${NAV_HEIGHT};

  pointer-events: none;

  background: white;

  > * {
    pointer-events: all;
  }

  @media (min-width: 768px) {
    background: transparent;
  }

  @media (min-width: ${BREAKPOINT_IMAC}) {
    background: transparent;
  }
`

const LogoStyle = styled.div`
  ${smallTextStyle};
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
`
