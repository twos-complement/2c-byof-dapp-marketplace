import Head from 'next/head'
import TrustedIdentitiesList from '../components/TrustedIdentitiesList'
import UserAddress from '../components/UserAddress';
import BYOFRecordsList from '../components/BYOFRecordsList'

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
        <BYOFRecordsList />
        <br />
        <h3>Wallet</h3>
        <UserAddress />
      </main>
    </div>
  )
}

export default Home
