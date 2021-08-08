import IDX from './IDX'
import ceramic from './ceramic'
import aliases from './aliases'
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'

let idx

export async function getIdx() {
  if (idx) return idx

  const addresses = await window.ethereum.enable()

  const threeIdConnect = new ThreeIdConnect()
  const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
  await threeIdConnect.connect(authProvider)
  const provider = await threeIdConnect.getDidProvider()

  try {
    ceramic.did.setProvider(provider)
    await ceramic.did.authenticate()
  } catch (e) {
    console.log(e)
  }

  // Create (and memoize) idx instance:
  idx = new IDX({
    ceramic,
    aliases,
  })

  // Log meta:
  console.log('Initialized User DID with 3ID Connect: ', idx.instance.id)
  console.log('Index:', await idx.instance.getIndex())

  return idx
}

export default idx