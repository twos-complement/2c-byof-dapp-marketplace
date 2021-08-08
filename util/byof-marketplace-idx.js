import ThreeIdProvider from '3id-did-provider'
import IDX from './IDX'
import ceramic from './ceramic'
import aliases from './aliases'
import seed from './byof-marketplace-seed'

let idx

export async function getIdx() {
  if (idx) return idx

  // Permission dialog (auto accept for BYOFMarketplace):
  function getPermission(request) {
    return request.payload.paths
  }

  // Create auth provider:
  const threeId = await ThreeIdProvider.create({ getPermission, seed, ceramic })
  const provider = threeId.getDidProvider()

  // Set DID provider for ceramic:
  //await ceramic.setDIDProvider(provider)
  //const did = new DID({ provider, resolver })

  // Create (and memoize) idx instance:
  idx = new IDX({
    ceramic,
    aliases,
  })

  // Log meta:
  console.log('Initialized BYOFMarketplace DID.')
  console.log(`DID: ${idx.instance.id}`)
  console.log('Index:')
  console.log(await idx.instance.getIndex())

  return idx
}

export default idx