import React from 'react'
import NextHead from 'next/head'
import { SITE_NAME } from '../constants'

export const Head: React.FC<{ title: string | null }> = ({ title }) => (
  <NextHead>
    <title>{title ? `${title} - ${SITE_NAME}` : SITE_NAME}</title>
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
)
