import { useState, useEffect } from 'react'
import {getIdx} from '../util/user-idx'

const AddTrustedIdentityForm = () => {

  const [loading, setLoading] = useState(true)
  const [idx, setIdx] = useState()
  const [did, setDid] = useState('')

  useEffect(() => {
    async function load() {
      const idx = await getIdx()
      setIdx(idx)
      setLoading(false)
    }

    load()
  }, [])

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

      <input name="trustedIdentity" value={did} onChange={e => setDid(e.target.value)} />
      <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddTrustedIdentityForm
