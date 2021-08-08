import { useState, useEffect } from 'react'
import {getIdx} from '../util/user-idx'

import AddTrustedIdentityForm from './AddTrustedIdentityForm'

const TrustedIdentitiesList = () => {

  const [trustedIdentities, setTrustedIdentities] = useState(null)

  useEffect(() => {
    async function load() {
      const idx = await getIdx()
      const data = await idx.loadTrustedIdentitiesList()
      setTrustedIdentities(data)
    }

    load()
  }, [])

  if (trustedIdentities === null) return <span>Loading trusted identities...</span>

  return (
    <div>
      <h1>Trusted Identities:</h1>

      {trustedIdentities.length != 0 && 
        <ul>
          {trustedIdentities.map(trustedIdentity => <li key={trustedIdentity.did}>{trustedIdentity.did}</li>)}
        </ul>
      }
      {!trustedIdentities.length && <span>No trusted identities!</span>}
      <AddTrustedIdentityForm />
    </div>
  )
}

export default TrustedIdentitiesList
