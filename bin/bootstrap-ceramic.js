import { promises as fs } from 'fs'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'

import { getIdx } from '../util/byof-marketplace-idx'
import TrustedIdentitiesListSchema from '../schemas/io.2c.hack-fs-2021.trustedIdentitiesList'

async function bootstrap() {
  // Initialize an IDX instance with BYOFMarketplace seed:
  const idx = await getIdx()
  console.log('BYOFMarketplace IDX DID:', idx.instance.id)

  const ceramic = idx.ceramic

  // Publish schemas:
  console.log( 'Publishing Schema: io.2c.hack-fs-2021.trustedIdentitiesList',)
  const [
    trustedIdentitiesListSchema,
  ] = await Promise.all([
    publishSchema(ceramic, { content: TrustedIdentitiesListSchema }),
  ])

  // Create definitions using the created schema ID:
  console.log('Creating Definition: trustedIdentitiesList')
  const trustedIdentitiesListDefinition = await createDefinition(ceramic, {
    name: 'trustedIdentitiesList',
    description: 'TrustedIdentitiesList',
    schema: trustedIdentitiesListSchema.commitId.toUrl(),
  })

  // Write config to JSON file:
  const config = {
    ownerDid: idx.instance.id,
    definitions: {
      trustedIdentitiesList: trustedIdentitiesListDefinition.id.toString(),
    },
    schemas: {
      TrustedIdentitiesList: trustedIdentitiesListSchema.commitId.toUrl(),
    },
  }
  await fs.writeFile(
    './util/ceramic-config.json',
    JSON.stringify(config, null, '\t'),
  )

  console.log('Config written to ../util/ceramic-config.json file:', config)
}

export default bootstrap