import styled, { css } from 'styled-components'

export const smallTextStyle = css`
  font-weight: 400;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.03rem;
`
export const SmallTextStyle = styled.div`
  ${smallTextStyle}
  display: inline-block;
  max-width: 256px;
`
