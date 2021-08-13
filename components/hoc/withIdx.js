import React, { useState, useEffect } from 'react'
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import IDXContext from '../contexts/idx'

import IDX from '../../util/IDX'
import ceramic from '../../util/ceramic'
import aliases from '../../util/aliases'

const withIdx = WrappedComponent => {
  const IdxComponent = props => {
    const [idx, setIdx] = useState()

    useEffect(() => {
      // Inject IDX identity provider:
      async function setup() {

        const addresses = await window.ethereum.enable()
        const threeIdConnect = new ThreeIdConnect()
        const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
        await threeIdConnect.connect(authProvider)

        try {
          const provider = await threeIdConnect.getDidProvider()
          ceramic.did.setProvider(provider)
          await ceramic.did.authenticate()
        } catch (e) {
          console.log(e)
        }

        // Create idx instance:
        const idx = new IDX({
          ceramic,
          aliases,
        })

        // Log meta:
        console.log('Initialized User DID with 3ID Connect: ', idx.instance.id)
        console.log('Index:', await idx.instance.getIndex())

        setIdx(idx)
      }

      setup()
    }, [])

    if (!idx) {
      return <h1>Loading IDX...</h1>
    }

    return (
      <IDXContext.Provider value={idx}>
        <WrappedComponent {...props} idx={idx}>
          {props.children}
        </WrappedComponent>
      </IDXContext.Provider>
    )
  }

  return IdxComponent
}

export default withIdx