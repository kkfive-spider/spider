import mongoose from 'mongoose'
import ENV from '../../config'

const { CTFPRICE_MONGO_URI, CTFPRICE_MONGO_NAME } = ENV

async function main(): Promise<mongoose.Mongoose> {
  return await mongoose.connect(CTFPRICE_MONGO_URI as string, { dbName: CTFPRICE_MONGO_NAME })
}

export default main
