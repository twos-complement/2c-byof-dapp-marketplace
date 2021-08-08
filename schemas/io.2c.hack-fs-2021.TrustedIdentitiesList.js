const TrustedIdentitiesListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.hack-fs-2021.trustedIdentitiesList',
  type: 'object',
  properties: {
    trustedIdentitiesList: {
      type: 'array',
      title: 'trustedIdentitiesList',
      items: {
        type: 'object',
        title: 'io.2c.hack-fs-2021.trustedIdentity',
        properties: {
          id: {
            $ref: '#/definitions/CeramicDocId',
          },
        },
      },
    }
  },
  definitions: {
    CeramicDocId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
}

export default TrustedIdentitiesListSchema