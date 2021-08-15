import { useState, useEffect } from 'react'

import { parseMetadata } from '../util/web3-storage'

const FrontendCard = ({ ipfsAddress, numberOfPeople }) => {

  const [name, setName] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const { thumbnail, name } = await parseMetadata(ipfsAddress)
      setName(name)
      setThumbnail(`https://ipfs.io/ipfs/${ipfsAddress}/${thumbnail}`)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) return <span>Loading...</span>

  return (
    <div>
      <p>{name} ({ipfsAddress} - {numberOfPeople} people</p>
      <img src={thumbnail} width={200} />
    </div>
  )
}

export default FrontendCard
