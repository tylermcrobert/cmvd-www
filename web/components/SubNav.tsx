import React from 'react'
import styled, { css } from 'styled-components'
import {
  BREAKPOINT_IMAC,
  NAV_BAR_WIDTH,
  NAV_HEIGHT,
  Z_INDEX_NAV_SUB,
} from '../constants'
import { smallTextStyle } from './SmallTextStyle'

export const SubNav: React.FC<{ ignoreSidebar: boolean }> = ({
  children,
  ignoreSidebar,
}) => {
  return <SubNavStyle ignoreSidebar={ignoreSidebar}>{children}</SubNavStyle>
}

const SubNavStyle = styled.section<{ ignoreSidebar: boolean }>`
  ${smallTextStyle}
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 1rem;
  height: ${NAV_HEIGHT};
  z-index: ${Z_INDEX_NAV_SUB};
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;

  @media (min-width: 768px) {
    justify-content: flex-start;

    top: 0;
    padding-left: 12rem;
  }

  @media (min-width: ${BREAKPOINT_IMAC}) {
    ${(p) =>
      !p.ignoreSidebar &&
      css`
        opacity: 1;
        padding-left: 1rem;
        background: transparent;
        padding-top: ${NAV_HEIGHT};
        height: auto;
        align-items: flex-start;
        justify-content: flex-start;
        top: ${NAV_HEIGHT};
        left: 0;
        width: ${NAV_BAR_WIDTH};
      `}
  }
`
