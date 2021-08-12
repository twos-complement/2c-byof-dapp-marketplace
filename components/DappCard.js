const DappCard = ({ contractAddress, ipfsAddresses }) => {
  return (
    <div>
      <h1>{contractAddress}</h1>
      <h2>IPFS Addresses</h2>
      <ul>
        {Object.keys(ipfsAddresses).map(ipfsHash => <li key={ipfsHash}>{ipfsHash} - {ipfsAddresses[ipfsHash]} people</li>)}
      </ul>
    </div>
  )
}

export default DappCard
