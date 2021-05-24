import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UnderlineLink } from './UnderlineLink'

export const NavigationLinks: React.FC = () => {
  const router = useRouter()

  return (
    <NavigationLinksStyle>
      <UnderlineLink enabled={router.route === '/'}>
        <Link href="/">Portfolio</Link>
      </UnderlineLink>
      <UnderlineLink enabled={router.route.includes('/info')}>
        <Link href="/info">Info</Link>
      </UnderlineLink>
      <UnderlineLink enabled={router.route.includes('/products')}>
        <Link href="/products">Fine Art</Link>
      </UnderlineLink>
    </NavigationLinksStyle>
  )
}

const NavigationLinksStyle = styled.div`
  margin: 0 -0.5rem;
`
