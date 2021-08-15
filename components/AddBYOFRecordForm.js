import { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button';

import IDXContext from './contexts/idx'

const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
`

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

        <Inputs>
          <TextField variant="outlined" name="contractAddress" value={contractAddress} onChange={e => setContractAddress(e.target.value)} placeholder="Backend Ethereum Contract Address" />
          <TextField variant="outlined" name="ipfsAddress" value={ipfsAddress} onChange={e => setIpfsAddress(e.target.value)} placeholder="Frontend IPFS Hash" />
          <Button variant="contained" type="submit">Add</Button>
        </Inputs>
      </form>
    </div>
  )
}

export default AddBYOFRecordForm
