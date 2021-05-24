import React from 'react'
import styled from 'styled-components'
import { NAV_HEIGHT } from '../constants'

export const StoreGrid: React.FC = ({ children }) => (
  <StoreGridStyle>{children}</StoreGridStyle>
)

const StoreGridStyle = styled.section`
  padding-bottom: ${NAV_HEIGHT};

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }
`
