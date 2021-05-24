import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { BREAKPOINT_IMAC } from '../constants'
import { FilterCtx } from '../pages/_app'
import { UnderlineLink } from './UnderlineLink'

export const NavigationFilterLinks: React.FC = ({ children }) => (
  <NavigationFilterLinksStyle>{children}</NavigationFilterLinksStyle>
)

export const FilterLink: React.FC<{
  title: string
  slug: string
  isCurrent: boolean
  onClick: () => any
}> = ({ title, isCurrent, slug, onClick }) => {
  const router = useRouter()
  const { setLastActiveFilter } = useContext(FilterCtx)

  const handleClick = () => {
    onClick()
    setLastActiveFilter(slug)
    router.push(`/?filter=${slug}`)
  }

  return (
    <Button type="button" onClick={handleClick}>
      <UnderlineLink enabled={isCurrent}>{title}</UnderlineLink>
    </Button>
  )
}

const Button = styled.button`
  @media (min-width: ${BREAKPOINT_IMAC}) {
    margin-bottom: 0.5rem;
  }
`

const NavigationFilterLinksStyle = styled.div`
  display: flex;
  margin: -0.5rem;

  @media (min-width: ${BREAKPOINT_IMAC}) {
    flex-direction: column;
    align-items: flex-start;
  }
`
