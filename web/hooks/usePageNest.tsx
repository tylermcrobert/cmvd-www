/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef } from 'react'
import { NextRouter } from 'next/router'

/**
 * is this a nested page
 * @param  router
 * @returns
 */
export const usePageNest = (router: NextRouter) => {
  const prevRouteRef = useRef('/')

  const getPreviousPageNestedStatus = () =>
    prevRouteRef.current.split('/').length === 3
  const getThisPageNestedStatus = () => router.route.split('/').length === 3

  const isPrevPageNested = getPreviousPageNestedStatus()
  const isThisPageNested = getThisPageNestedStatus()

  useEffect(() => {
    prevRouteRef.current = router.route
  }, [router.route])

  return { isPrevPageNested, isThisPageNested }
}
