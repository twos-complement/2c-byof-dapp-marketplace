import { useContext } from 'react'

import DataContext from './contexts/data'
import DappCard from './DappCard'

const DappList = () => {

  const { data } = useContext(DataContext)

  if (!data || !data.BYOFRecords) return <span>Loading (please select data source)...</span>

  // Build list of dapps and their various ipfsAddresses:
  const dapps = {}
  data.BYOFRecords.forEach(({ contractAddress, ipfsAddress }) => {
    // Initalize maps/counters:
    if (!dapps[contractAddress]) dapps[contractAddress] = {}
    if (!dapps[contractAddress][ipfsAddress]) dapps[contractAddress][ipfsAddress] = 0
    // Increment counter for that smart contract / IPFS address combo:
    dapps[contractAddress][ipfsAddress]++
  })

  return (
    <div>
      <h1>Dapp List:</h1>
      {Object.keys(dapps).map(contractAddress => <DappCard contractAddress={contractAddress} ipfsAddresses={dapps[contractAddress]} key={contractAddress} />)}
    </div>
  )
}

export default DappList
