import React from 'react'
import styled from 'styled-components'
import { smallTextStyle } from './SmallTextStyle'

export const UnderlineLink: React.FC<{ enabled: boolean }> = ({
  children,
  enabled,
}) => {
  return <UnderlineLinkStyle enabled={enabled}>{children}</UnderlineLinkStyle>
}

const UnderlineLinkStyle = styled.span<{ enabled: boolean }>`
  ${smallTextStyle};
  cursor: pointer;
  position: relative;
  margin: 0 0.5rem;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${(p) => (p.enabled ? 'black' : 'transparent')};
  }
`
