const TrustedIdentitiesListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.hack-fs-2021.trustedIdentitiesList',
  type: 'object',
  properties: {
    trustedIdentities: {
      type: 'array',
      title: 'trustedIdentities',
      items: {
        type: 'string',
        title: 'io.2c.hack-fs-2021.trustedIdentitiesList',
      },
    },
  },
}

export default TrustedIdentitiesListSchema