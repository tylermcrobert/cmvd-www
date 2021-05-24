import React from 'react'
import styled from 'styled-components'

export const HomeFeed: React.FC = ({ children }) => (
  <HomeFeedStyle>{children}</HomeFeedStyle>
)

const HomeFeedStyle = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-start;

  margin: -0.5rem;

  > * {
    margin: 0.5rem;
  }
`
