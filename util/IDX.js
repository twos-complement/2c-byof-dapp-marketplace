import { IDX as _IDX } from '@ceramicstudio/idx'
import { schemas } from './ceramic-config.json'
import { TileDocument } from '@ceramicnetwork/stream-tile'

export const DEFAULT_TRUSTED_IDENTITIES_LISTS = {
  IndieDAO: [
    'did:3:kjzl6cwe1jw147cod70hyulh9usjabusfp8tw5lz1k8r0q2m0os45av4fvk3ohl', // nico
    'did:3:kjzl6cwe1jw145vragmdq2chqkljhzyck3ck0nj4ineydxm08lbg4iqgvq4vqxe', // nico2
    'did:3:kjzl6cwe1jw147gv3zfr23qsg33ffkjuxq6p67nelsebzl5dnt8lubg22sm2968', // nico3
    'did:3:kjzl6cwe1jw1474b9pu7byl190dvub56xdz8trcc5vbuwnx3cxhivoh00ke94s1', // nico4
    'did:3:kjzl6cwe1jw148brvo3w0tyeznlb80rde79xlj2jd934qv1j5s1q4mpu5n5s8e3', // nico5 - usa
    'did:3:kjzl6cwe1jw146g1ck2yg6u6z7b2xm0vyzol64fnuy8qzruoer08eo3xljzel2a', // nico6 - china
    'did:3:kjzl6cwe1jw14b1dlrg7q8hhivzwo73o01fi1bp9040vmj498fgbrs3bolbmbzk', // nico7 - decentraland
    'did:3:kjzl6cwe1jw145uv10vi6g93a85o5hbvjq1ls7gnyk2wjn0c87rxur5rehiqyvp', // edder
    'did:3:kjzl6cwe1jw148tt4a964zmagfw99258p0y6cje8ofgurujhyow1nmf7zc27i9n' // gus
  ],
  // TODO add community lists:
  Uniswap: ['did:3:kjzl6cwe1jw147cod70hyulh9usjabusfp8tw5lz1k8r0q2m0os45av4fvk3ohl'],
  FWB: ['did:3:kjzl6cwe1jw147cod70hyulh9usjabusfp8tw5lz1k8r0q2m0os45av4fvk3ohl'],
  HackFS: ['did:3:kjzl6cwe1jw147cod70hyulh9usjabusfp8tw5lz1k8r0q2m0os45av4fvk3ohl'],
}
class IDX {
  constructor({ ceramic, aliases }) {
    this.instance = new _IDX({ ceramic, aliases })
    this.ceramic = ceramic
    this.aliases = aliases
  }

  async loadRecords({trustedIdentities, schemaName}) {
    // Load each trusted identity:
    let records = []
    for (var i=0; i<trustedIdentities.length; i++) {
      const data = await this.instance.get(schemaName, trustedIdentities[i])
      console.log(`Loading records from ${trustedIdentities[i]}`, data)
      if (data) records.push(data)
    }
    return records
  }

  async parseBYOFRecordsLists(BYOFRecordsLists) {
    const BYOFRecords = []
    // Each list of records:
    for (var i=0; i<BYOFRecordsLists.length; i++) {
      // Each record:
      for (var j=0; j<BYOFRecordsLists[i].BYOFRecordsList.length; j++) {
        try {
          const streamId = BYOFRecordsLists[i].BYOFRecordsList[j].id.split('//')[1]
          const BYOFRecord = await this.ceramic.loadStream(streamId)
          BYOFRecords.push(BYOFRecord.content.content)
        } catch (e) {
          //console.log('Error parsing BYOFRecord List (skipping):', e)
        }
      }
    }
    return BYOFRecords
  }

  async loadTrustedIdentitiesList() {
    // Load trustedIdentities list:
    const data = await this.instance.get('trustedIdentitiesList')
    if (!data || !data.trustedIdentitiesList) return []

    // Load each trusted identity:
    let trustedIdentities = []
    for (var i=0; i<data.trustedIdentitiesList.length; i++) {
      try {
        // Get stream id from doc Ceramic protocol (ceramic://streamID):
        const streamId = data.trustedIdentitiesList[i].id.split('//')[1]
        const trustedIdentity = await this.ceramic.loadStream(streamId)
        trustedIdentities.push(trustedIdentity.content.content)
      } catch (e) {
        //console.log('Error parsing trustedIdentity (skipping):', e)
      }
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
      try {
        // Get stream id from doc Ceramic protocol (ceramic://streamID):
        const streamId = data.BYOFRecordsList[i].id.split('//')[1]
        const BYOFRecord = await this.ceramic.loadStream(streamId)
        BYOFRecords.push(BYOFRecord.content.content)
      } catch (e) {
        //console.log('Error parsing BYOFRecord (skipping):', e)
      }
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