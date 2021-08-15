import { useContext, useState, useEffect } from 'react'
import styled from "@emotion/styled";

import DataContext from './contexts/data'
import DappCard from './DappCard'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  padding-top: 80px;
`

const DappList = () => {

  const { data } = useContext(DataContext)
  const [dapps, setDapps] = useState({})

  useEffect(() => {
    console.log('datachanged,', data)
    if (!data || !data.BYOFRecords) return
    console.log('continuing to render...', data)

    // Build list of dapps and their various ipfsAddresses:
    const newDapps = {}
    data.BYOFRecords.forEach(({ contractAddress, ipfsAddress }) => {
      // Initalize maps/counters:
      if (!newDapps[contractAddress]) newDapps[contractAddress] = {}
      if (!newDapps[contractAddress][ipfsAddress]) newDapps[contractAddress][ipfsAddress] = 0
      // Increment counter for that smart contract / IPFS address combo:
      newDapps[contractAddress][ipfsAddress]++
    })
    setDapps(newDapps)
  }, [data])

  if (!data || !data.BYOFRecords) return <span>Loading (please select data source)...</span>

  return (
    <Wrapper>
      {Object.keys(dapps).map(contractAddress =>
        <DappCard
          contractAddress={contractAddress}
          ipfsAddresses={dapps[contractAddress]}
          key={JSON.stringify(dapps[contractAddress])+contractAddress}
        />)}
    </Wrapper>
  )
}

export default DappList
