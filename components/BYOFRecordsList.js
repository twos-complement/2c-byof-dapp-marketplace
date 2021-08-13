import { useState, useEffect, useContext } from 'react'
import IDXContext from './contexts/idx'

import AddBYOFRecordForm from './AddBYOFRecordForm'

const BYOFRecordsList = () => {

  const [BYOFRecords, setBYOFRecords] = useState(null)
  const idx = useContext(IDXContext)

  useEffect(() => {
    async function load() {
      const data = await idx.loadBYOFRecordsList()
      setBYOFRecords(data)
    }

    load()
  }, [])

  if (BYOFRecords === null) return <span>Loading BYOF Records...</span>

  return (
    <div>
      <h1>BYOF Records:</h1>

      {BYOFRecords.length != 0 && 
        <ul>
          {BYOFRecords.map(BYOFRecord => <li key={BYOFRecord.contractAddress}>{BYOFRecord.contractAddress} =&gt; {BYOFRecord.ipfsAddress}</li>)}
        </ul>
      }
      {!BYOFRecords.length && <span>No BYOF Records!</span>}
      <AddBYOFRecordForm />
    </div>
  )
}

export default BYOFRecordsList
