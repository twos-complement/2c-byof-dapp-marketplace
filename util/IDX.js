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
    // Load trustedIdentities list:
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

    // Add doc to trustedIdentitiesList on IDX:
    const trustedIdentitiesListDoc = await this.instance.set('trustedIdentitiesList', {
      trustedIdentitiesList: [...current, { id: `ceramic://${trustedIdentityDoc.id.toString()}` }]
    })

    console.log('doc', trustedIdentitiesListDoc)

    return trustedIdentitiesListDoc
  }

  async loadBYOFRecordsList() {
    // Load BYOFRecord list:
    const data = await this.instance.get('BYOFRecordsList')
    if (!data || !data.BYOFRecordsList) return []

    // Load each BYOFRecord:
    let BYOFRecords = []
    for (var i=0; i<data.BYOFRecordsList.length; i++) {
      // Get stream id from doc Ceramic protocol (ceramic://streamID):
      const streamId = data.BYOFRecordsList[i].id.split('//')[1]
      const BYOFRecord = await this.ceramic.loadStream(streamId)
      BYOFRecords.push(BYOFRecord.content.content)
    }
    return BYOFRecords
  }

  async addBYOFRecord({contractAddress, ipfsAddress}) {
    let current = await this.loadBYOFRecordsList()

    const BYOFRecord = {
      contractAddress,
      ipfsAddress,
    }

    // Create BYOFRecord on Ceramic:
    const BYOFRecordDoc = await TileDocument.create(this.ceramic, {
      content: BYOFRecord,
      metadata: {
        schema: schemas.BYOFRecord,
        controllers: [this.instance.id],
      },
    })

    // Add doc to BYOFRecordsList on IDX:
    const BYOFRecordsListDoc = await this.instance.set('BYOFRecordsList', {
      BYOFRecordsList: [...current, { id: `ceramic://${BYOFRecordDoc.id.toString()}` }]
    })

    console.log('doc', BYOFRecordsListDoc)

    return BYOFRecordsListDoc
  }
}

export default IDX