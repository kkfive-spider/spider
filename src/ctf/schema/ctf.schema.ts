import connect from '../db/index'

const mongoose = await connect()

export const ctfPriceSchema = new mongoose.Schema({
  todayPriceHK: Number,
  todayPriceRMB: Number,
  todayPriceTzjt: Number,
  touziZuboPrice: Number,
  baiJianHJPrice: Number,
  touziZuboHJPrice: Number,
  inputTime: String,
}, { timestamps: true, collection: 'ctf_price' })

const ctfPrice = mongoose.model('ctf_price', ctfPriceSchema)

export default ctfPrice
