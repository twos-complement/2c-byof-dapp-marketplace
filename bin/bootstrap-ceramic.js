import { promises as fs } from 'fs'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'

import { getIdx } from '../util/byof-marketplace-idx'
import TrustedIdentitySchema from '../schemas/io.2c.hack-fs-2021.trustedIdentity'
import TrustedIdentitiesListSchema from '../schemas/io.2c.hack-fs-2021.trustedIdentitiesList'
import BYOFRecordSchema from '../schemas/io.2c.hack-fs-2021.BYOFRecord'
import BYOFRecordsListSchema from '../schemas/io.2c.hack-fs-2021.BYOFRecordsList'

async function bootstrap() {
  // Initialize an IDX instance with BYOFMarketplace seed:
  const idx = await getIdx()
  console.log('BYOFMarketplace IDX DID:', idx.instance.id)

  const ceramic = idx.ceramic

  // Publish schemas:
  console.log( 'Publishing Schema: io.2c.hack-fs-2021.trustedIdentitiesList',)
  const [
    trustedIdentitiesListPublishedSchema,
  ] = await Promise.all([
    publishSchema(ceramic, { content: TrustedIdentitiesListSchema }),
  ])
  console.log( 'Publishing Schema: io.2c.hack-fs-2021.trustedIdentity',)
  const [
    trustedIdentityPublishedSchema,
  ] = await Promise.all([
    publishSchema(ceramic, { content: TrustedIdentitySchema }),
  ])
  console.log( 'Publishing Schema: io.2c.hack-fs-2021.BYOFRecordsList',)
  const [
    BYOFRecordsListPublishedSchema,
  ] = await Promise.all([
    publishSchema(ceramic, { content: BYOFRecordsListSchema }),
  ])
  console.log( 'Publishing Schema: io.2c.hack-fs-2021.BYOFRecord',)
  const [
    BYOFRecordPublishedSchema,
  ] = await Promise.all([
    publishSchema(ceramic, { content: BYOFRecordSchema }),
  ])

  // Create definitions using the created schema ID:
  console.log('Creating Definition: trustedIdentitiesList')
  const trustedIdentitiesListDefinition = await createDefinition(ceramic, {
    name: 'trustedIdentitiesList',
    description: 'TrustedIdentitiesList',
    schema: trustedIdentitiesListPublishedSchema.commitId.toUrl(),
  })
  console.log('Creating Definition: trustedIdentity')
  const trustedIdentityDefinition = await createDefinition(ceramic, {
    name: 'trustedIdentity',
    description: 'TrustedIdentity',
    schema: trustedIdentityPublishedSchema.commitId.toUrl(),
  })
  console.log('Creating Definition: BYOFRecordsList')
  const BYOFRecordsListDefinition = await createDefinition(ceramic, {
    name: 'BYOFRecordsList',
    description: 'BYOFRecordsList',
    schema: BYOFRecordsListPublishedSchema.commitId.toUrl(),
  })
  console.log('Creating Definition: BYOFRecord')
  const BYOFRecordDefinition = await createDefinition(ceramic, {
    name: 'BYOFRecord',
    description: 'BYOFRecord',
    schema: BYOFRecordPublishedSchema.commitId.toUrl(),
  })

  // Write config to JSON file:
  const config = {
    ownerDid: idx.instance.id,
    definitions: {
      trustedIdentity: trustedIdentityDefinition.id.toString(),
      trustedIdentitiesList: trustedIdentitiesListDefinition.id.toString(),
      BYOFRecord: BYOFRecordDefinition.id.toString(),
      BYOFRecordsList: BYOFRecordsListDefinition.id.toString(),
    },
    schemas: {
      TrustedIdentity: trustedIdentityPublishedSchema.commitId.toUrl(),
      TrustedIdentitiesList: trustedIdentitiesListPublishedSchema.commitId.toUrl(),
      BYOFRecord: BYOFRecordPublishedSchema.commitId.toUrl(),
      BYOFRecordsList: BYOFRecordsListPublishedSchema.commitId.toUrl(),
    },
  }
  await fs.writeFile(
    './util/ceramic-config.json',
    JSON.stringify(config, null, '\t'),
  )

  console.log('Config written to ../util/ceramic-config.json file:', config)
}

export default bootstrap