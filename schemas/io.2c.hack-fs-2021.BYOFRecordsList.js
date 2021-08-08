const BYOFRecordsListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'io.2c.hack-fs-2021.BYOFRecordsList',
  type: 'object',
  properties: {
    BYOFRecordsList: {
      type: 'array',
      title: 'BYOFRecordsList',
      items: {
        type: 'object',
        title: 'io.2c.hack-fs-2021.BYOFRecord',
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

export default BYOFRecordsListSchema