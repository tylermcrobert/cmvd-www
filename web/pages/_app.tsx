/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navigation } from '../components/Navigation'
import { PageTransitions } from '../components/PageTransitions'
import { usePageNest } from '../hooks/usePageNest'

type Context = {
  lastActiveFilter: string | null
  setLastActiveFilter: React.Dispatch<React.SetStateAction<string | null>>
}

export const FilterCtx = createContext<Context>({
  lastActiveFilter: null,
  setLastActiveFilter: () => {},
})

function MyApp({ Component, pageProps, router }: AppProps) {
  const { isThisPageNested } = usePageNest(router)
  const [lastActiveFilter, setLastActiveFilter] = useState<string | null>(null)

  return (
    <FilterCtx.Provider value={{ lastActiveFilter, setLastActiveFilter }}>
      <Navigation isCloseButton={isThisPageNested} />
      <PageTransitions>
        <Component {...pageProps} key={router.route} />
      </PageTransitions>
    </FilterCtx.Provider>
  )
}

export default MyApp
