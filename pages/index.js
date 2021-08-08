import Head from 'next/head'
import TrustedIdentitiesList from '../components/TrustedIdentitiesList'

const Home = () => {
  return (
    <div>
      <Head>
        <title>HackFS BYOF Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to BYOF Marketplace</h1>
        <TrustedIdentitiesList />
      </main>
    </div>
  )
}

export default Home
