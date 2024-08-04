/* eslint-disable node/prefer-global/process */
import * as dotenv from 'dotenv'

const config = {
  CTFPRICE_MONGO_URI: process.env.CTFPRICE_MONGO_URI,
  CTFPRICE_MONGO_NAME: process.env.CTFPRICE_MONGO_NAME,

}

if (process.env.CI !== 'true') {
  const r = dotenv.config({ debug: true, path: ['.env.local'] })
  if (r.parsed) {
    config.CTFPRICE_MONGO_URI = r.parsed.CTFPRICE_MONGO_URI
    config.CTFPRICE_MONGO_NAME = r.parsed.CTFPRICE_MONGO_NAME
  }
}
const ENV = config
export default ENV
