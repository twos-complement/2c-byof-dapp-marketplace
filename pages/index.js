import Head from 'next/head'
import Link from 'next/link'
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
        <DappList />
      </main>
    </div>
  )
}

export default Home;
