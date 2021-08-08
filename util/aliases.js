import { ownerDid, definitions } from './ceramic-config.json'

// Define Ceramic/IDX aliases:
const aliases = {
	ownerDid,
	...definitions
  // Add 3rd party & custom aliases here:
}

export default aliases