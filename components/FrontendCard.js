import { useState, useEffect } from 'react'
import styled from "@emotion/styled";
import { css } from '@emotion/react';

import { parseMetadata } from '../util/web3-storage'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`

const Thumbnail = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  height: 200px;
  border-radius: 20px 20px 0 0;
`

const Content = styled.div`
  padding: 20px;
  border-radius: 0 0 20px 20px;
  margin: 0;
  ${({ theme}) => css`
    background-color: ${theme.colors.backgroundLight};
  `}

  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`

const FrontendCard = ({ ipfsAddress, numberOfPeople }) => {

  const [name, setName] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const { thumbnail, name } = await parseMetadata(ipfsAddress)
      setName(name)
      setThumbnail(`https://ipfs.io/ipfs/${ipfsAddress}/${thumbnail}`)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) return <span>Loading...</span>

  return (
    <Wrapper>
      <a href={`https://ipfs.io/ipfs/${ipfsAddress}`} target="_blank">
        <Thumbnail src={thumbnail} />
      </a>
      <Content>
        <h2>
          {name}
        </h2>
        <p>{ipfsAddress}</p>
        People: {numberOfPeople}
      </Content>
    </Wrapper>
  )
}

export default FrontendCard
