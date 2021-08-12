import { useState, useContext } from 'react'

import IDXContext from './contexts/idx'

const AddBYOFRecordForm = () => {

  const [loading, setLoading] = useState(false)
  const [contractAddress, setContractAddress] = useState('')
  const [ipfsAddress, setIpfsAddress] = useState('')
  const idx = useContext(IDXContext)

  if (loading) return <span>Loading...</span>

  return (
    <div>
      <h1>Add BYOF Record:</h1>
      <form onSubmit={async e => {
        e.preventDefault()
        setLoading(true)
        await idx.addBYOFRecord({ contractAddress, ipfsAddress })
        setLoading(false)
      }}>

      <input name="contractAddress" value={contractAddress} onChange={e => setContractAddress(e.target.value)} placeholder="Backend Ethereum Contract Address" />
      <input name="ipfsAddress" value={ipfsAddress} onChange={e => setIpfsAddress(e.target.value)} placeholder="Frontend IPFS Hash" />
      <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddBYOFRecordForm
