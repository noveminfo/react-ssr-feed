import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderWrapper = styled.div`
  background-color: orange;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Title = styled.h1`
  pointer-events: none;
`

const HearderLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Header = () => (
  <HeaderWrapper>
    <HearderLink to='/?page=1'>
      <Title>Q&A Feed</Title>
    </HearderLink>
  </HeaderWrapper>
)

export default Header
