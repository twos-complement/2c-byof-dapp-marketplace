const TrustedIdentity = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.hack-fs-2021.trustedIdentity',
  type: 'object',
  properties: {
    nickname: {
      type: 'string',
    },
    did: {
      type: 'string',
    },
  },
}

export default TrustedIdentity