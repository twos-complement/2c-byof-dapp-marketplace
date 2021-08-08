import Head from 'next/head'

export default function Page401() {
  return (
    <div>
      <Head>
        <title>Hack FS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>401 Unauthorized</h1>
        <a href="/login">Login</a>
      </main>
    </div>
  )
}
