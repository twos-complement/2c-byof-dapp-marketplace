import { useState, useContext } from 'react'
import IDXContext from './contexts/idx'

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

      <input name="trustedIdentity" value={did} onChange={e => setDid(e.target.value)} placeholder="Trusted DID" />
      <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddTrustedIdentityForm
