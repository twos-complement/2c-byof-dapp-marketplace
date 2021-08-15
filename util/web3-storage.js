import { Web3Storage } from 'web3.storage'

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // Nico's token - please be nice:
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxMzdlOWMwYTkwRjEyNjE3ZTQ3NjI3ZUVGM2ZmM0FhMTg4OTIzOWUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg4MTAwNDMyNDgsIm5hbWUiOiJoYWNrZnMifQ.hIYibIZy1glKrjN2J6Y7cG2nom0mrxgZQDosrleocAM'

  // In a real app, it's better to read an access token from an 
  // environement variable or other configuration that's kept outside of 
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

export async function retrieve(cid) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }

  const files = await res.files()

  return files
}

export async function parseMetadata(cid) {
  const files = await retrieve(cid)
  console.log(files)
  const metadata = files.find(file => file.name === "metadata.json")
  const resp = await fetch(`https://ipfs.io/ipfs/${metadata.cid}`)
  const data = await resp.json()
  return data
}


export default {}