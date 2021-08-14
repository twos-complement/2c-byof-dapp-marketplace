import { useEffect } from 'react'

import FrontendCard from './FrontendCard'
import { retrieve } from '../util/web3-storage'

const DappCard = ({ contractAddress, ipfsAddresses }) => {

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
      const files = await retrieve(mostPopularCID)
      const assetManifest = files.find(file => file.name === "asset-manifest.json")
      const resp = await fetch(`https://ipfs.io/ipfs/${assetManifest.cid}`)
      const manifestData = await resp.json()
      console.log(manifestData)
    } catch (e) {
      console.log('Error loading manifest: ', e)
    }
  }

  return (
    <div>
      <h1>{contractAddress}</h1>
      <h2>IPFS Addresses</h2>
      <ul>
        {Object.keys(ipfsAddresses).map(ipfsAddress => 
          <FrontendCard key={ipfsAddress} ipfsAddress={ipfsAddress} numberOfPeople={ipfsAddresses[ipfsAddress]} />
        )}
      </ul>
    </div>
  )
}

export default DappCard
