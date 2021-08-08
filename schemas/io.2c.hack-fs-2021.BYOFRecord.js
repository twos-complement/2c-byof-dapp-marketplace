const BYOFRecord = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.hack-fs-2021.BYOFRecord',
  type: 'object',
  properties: {
    contractAddress: {
      type: 'string',
    },
    ipfsAddress: {
      type: 'string',
    },
  },
}

export default BYOFRecord