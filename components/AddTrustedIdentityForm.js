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

const AddTrustedIdentityForm = () => {

  const [loading, setLoading] = useState(false)
  const [did, setDid] = useState('')
  const idx = useContext(IDXContext)

  if (loading) return <span>Loading...</span>

  return (
    <div>
      <h1>Add Trusted Identity:</h1>
      <form onSubmit={async e => {
        e.preventDefault()
        setLoading(true)
        await idx.addTrustedIdentity(did)
        setLoading(false)
      }}>

        <Inputs>
          <TextField variant="outlined" name="trustedIdentity" value={did} onChange={e => setDid(e.target.value)} placeholder="Trusted DID" />
          <Button variant="contained" type="submit">Add</Button>
        </Inputs>
      </form>
    </div>
  )
}

export default AddTrustedIdentityForm
