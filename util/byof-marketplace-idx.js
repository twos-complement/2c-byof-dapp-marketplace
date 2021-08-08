import ThreeIdProvider from '3id-did-provider'
import IDX from './IDX'
import ceramic from './ceramic'
import aliases from './aliases'
import seed from './byof-marketplace-seed'

let idx

export async function getIdx() {
  if (idx) return idx

  // Create auth provider:
  const threeId = await ThreeIdProvider.create({ getPermission: () => [], seed, ceramic })
  const provider = threeId.getDidProvider()

  // Set DID provider for ceramic:
  //TODO: FIX:
  //await ceramic.did.setProvider(provider)

  // Authenticate:
  //TODO: FIX:
  //await ceramic.did.authenticate()

  // Create (and memoize) idx instance:
  idx = new IDX({
    ceramic,
    aliases,
  })

  // Log meta:
  console.log('Initialized BYOFMarketplace DID: ', idx.instance.id)
  console.log('Index:', await idx.instance.getIndex())

  return idx
}

export default idx