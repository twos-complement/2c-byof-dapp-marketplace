import { IDX as _IDX } from '@ceramicstudio/idx'
import { schemas } from './ceramic-config.json'

class IDX {
  constructor({ ceramic, aliases }) {
    this.instance = new _IDX({ ceramic, aliases })
    this.ceramic = ceramic
    this.aliases = aliases
  }
}

export default IDX