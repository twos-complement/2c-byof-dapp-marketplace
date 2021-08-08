import Ceramic from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

//TODO: Abstract ceramic node
const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')

const resolver = { ...KeyDidResolver.getResolver(),
                   ...ThreeIdResolver.getResolver(ceramic) }
const did = new DID({ resolver })
ceramic.did = did

export default ceramic