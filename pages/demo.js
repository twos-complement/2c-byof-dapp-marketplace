import Head from 'next/head'
import TrustedIdentitiesList from '../components/TrustedIdentitiesList'
import BYOFRecordsList from '../components/BYOFRecordsList'
import DataSelector from '../components/DataSelector'

const DemoPage = () => {
  return (
    <div>
      <Head>
        <title>HackFS BYOF Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Data Demo</h1>
        <TrustedIdentitiesList />
        <BYOFRecordsList />
        <DataSelector />
      </main>
    </div>
  )
}

export default DemoPage
