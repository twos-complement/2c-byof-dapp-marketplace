import { useState, useContext } from 'react'
import { TwosComplementList } from '../util/IDX'

import IDXContext from './contexts/idx'

const DataSelector = () => {

  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState([])
  const idx = useContext(IDXContext)

  if (loading) return <span>Loading...</span>

  return (
    <div>
      <h1>Data Selector:</h1>
      <ul>
        <li onClick={async () => {
          setLoading(true)
          const BYOFRecordsLists = await idx.loadRecords({trustedIdentities: TwosComplementList, schemaName: "BYOFRecordsList"})
          const records = await idx.parseBYOFRecordsLists(BYOFRecordsLists)
          setRecords(records)
          setLoading(false)
        }}>Two's Complement</li>
      </ul>
      <h2>All BYOF Records:</h2>
      <ul>
        {records.length > 0 && records.map(record => <li key={record.contractAddress}>{JSON.stringify(record)}</li>)}
      </ul>
    </div>
  )
}

export default DataSelector
