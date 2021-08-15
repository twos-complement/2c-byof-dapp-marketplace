import Head from 'next/head'
import DappList from '../components/DappList'

const Home = () => {
  return (
    <div>
      <Head>
        <title>BYOF Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DappList />
      </main>
    </div>
  )
}

export default Home;
