import React from 'react'
import styled from 'styled-components'

export const Icon: React.FC<{
  type: 'CARRAT' | 'ARROW RIGHT' | 'ARROW NE'
}> = ({ type }) => {
  if (type === 'CARRAT') {
    return (
      <svg
        width="15"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5l5 5 5-5"
          stroke="var(--color-primary)"
          strokeWidth="1.5"
        />
      </svg>
    )
  }
  return <IconStyle>Icon</IconStyle>
}

const IconStyle = styled.section`
  border: 1px solid magenta;
  display: inline;
`
