import { useState, useEffect } from 'react'
import styled from "@emotion/styled";
import { css } from '@emotion/react';
import Drawer from '@material-ui/core/Drawer';

import FrontendCard from './FrontendCard'
import { parseMetadata } from '../util/web3-storage'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
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

const SideNav = styled.div`
  padding: 40px;
`

const CloseButton = styled.h3`
  cursor: pointer;
`

const DappCard = ({ contractAddress, ipfsAddresses }) => {

  const [thumbnail, setThumbnail] = useState()
  const [name, setName] = useState()
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    // Find thumbnail from most popular frontend:
    let mostPopularCID
    let mostPopularCount = 0
    Object.keys(ipfsAddresses).forEach(cid => {
      if (ipfsAddresses[cid] > mostPopularCount) {
        mostPopularCount = ipfsAddresses[cid]
        mostPopularCID = cid
      }
    })

    // Load IPFS data:
    try {
      const { thumbnail, name } = await parseMetadata(mostPopularCID)
      setThumbnail(`https://ipfs.io/ipfs/${mostPopularCID}/${thumbnail}`)
      setName(name)
    } catch (e) {
      console.log('Error loading manifest: ', e)
    }
  }

  return (
    <Wrapper onClick={() => setShowDrawer(true)}>
      <Thumbnail src={thumbnail} />
      <Content>
        <h2>
          {name}
        </h2>
        <p>{contractAddress}</p>
      </Content>
      <Drawer anchor="right" open={showDrawer}>
        <SideNav>
          <CloseButton onClick={() => setShowDrawer(false)}>X Close</CloseButton>
          {Object.keys(ipfsAddresses).map(ipfsAddress => 
            <FrontendCard key={ipfsAddress}
              ipfsAddress={ipfsAddress}
              numberOfPeople={ipfsAddresses[ipfsAddress]}
            />
          )}
        </SideNav>
      </Drawer>
    </Wrapper>
  )
}

export default DappCard
