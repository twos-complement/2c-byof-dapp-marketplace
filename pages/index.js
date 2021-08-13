import Head from 'next/head'
import Link from 'next/link'
import DataSelector from '../components/DataSelector'
import DappList from '../components/DappList'
import UserAddress from '../components/UserAddress';

const Home = () => {
  return (
    <div>
      <Head>
        <title>HackFS BYOF Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to BYOF Marketplace</h1>
        <UserAddress />
        <Link href="/demo"><a>Demo / Admin</a></Link>
        <DataSelector />
        <DappList />
      </main>
    </div>
  )
}

export default Home
