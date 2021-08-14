import Head from 'next/head'
import withIdx from '../components/hoc/withIdx'
import withData from '../components/hoc/withData'
import Link from 'next/link'
import DataSelector from '../components/DataSelector'
import DappList from '../components/DappList'

const Home = () => {
  return (
    <div>
      <Head>
        <title>HackFS BYOF Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to BYOF Marketplace</h1>
        <Link href="/demo"><a>Demo / Admin</a></Link>
        <DataSelector />
        <DappList />
      </main>
    </div>
  )
}

export default withIdx(withData(Home));
