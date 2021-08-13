import { useState, useEffect, useContext } from 'react'
import IDXContext from './contexts/idx'

import AddTrustedIdentityForm from './AddTrustedIdentityForm'

const TrustedIdentitiesList = () => {

  const [trustedIdentities, setTrustedIdentities] = useState(null)
  const idx = useContext(IDXContext)

  useEffect(() => {
    async function load() {
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
