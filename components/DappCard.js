import FrontendCard from './FrontendCard'

const DappCard = ({ contractAddress, ipfsAddresses }) => {
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
