import { useState, useEffect } from 'react'
import { retrieve } from '../util/web3-storage'

const FrontendCard = ({ ipfsAddress, numberOfPeople }) => {

  const [files, setFiles] = useState([])

  useEffect(() => {
    async function loadData() {
      const files = await retrieve(ipfsAddress)
      setFiles(files)
    }

    loadData()
  }, [])

  return (
    <div>
      <p>{ipfsAddress} - {numberOfPeople} people</p>
      <h4>Files from cid:</h4>
      <ul>
        {files.map(file =>
          <li key={file.cid}>{file.name}</li>
        )}
      </ul>
    </div>
  )
}

export default FrontendCard
