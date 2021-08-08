import { IDX as _IDX } from '@ceramicstudio/idx'
import { schemas } from './ceramic-config.json'
import { TileDocument } from '@ceramicnetwork/stream-tile'

class IDX {
  constructor({ ceramic, aliases }) {
    this.instance = new _IDX({ ceramic, aliases })
    this.ceramic = ceramic
    this.aliases = aliases
  }

  async loadTrustedIdentitiesList() {
    // Load trustedIdentities list from BYOF Marketplace index:
    const data = await this.instance.get('trustedIdentitiesList')
    if (!data || !data.trustedIdentitiesList) return []

    // Load each trusted identity:
    let trustedIdentities = []
    for (var i=0; i<data.trustedIdentitiesList.length; i++) {
      // Get stream id from doc Ceramic protocol (ceramic://streamID):
      const streamId = data.trustedIdentitiesList[i].id.split('//')[1]
      const trustedIdentity = await this.ceramic.loadStream(streamId)
      trustedIdentities.push(trustedIdentity.content.content)
    }
    return trustedIdentities
  }

  async addTrustedIdentity(did) {
    let current = await this.loadTrustedIdentitiesList()

    const trustedIdentity = {
      nickname: 'self-test',
      did,
    }

    // Create TrustedIdentity on Ceramic:
    const trustedIdentityDoc = await TileDocument.create(this.ceramic, {
      content: trustedIdentity,
      metadata: {
        schema: schemas.TrustedIdentity,
        controllers: [this.instance.id],
      },
    })

    // Add did to trustedIdentitiesList on IDX:
    const trustedIdentitiesListDoc = await this.instance.set('trustedIdentitiesList', {
      trustedIdentitiesList: [...current, { id: `ceramic://${trustedIdentityDoc.id.toString()}` }]
    })

    console.log('doc', trustedIdentitiesListDoc)

    return trustedIdentitiesListDoc
  }
}

export default IDX