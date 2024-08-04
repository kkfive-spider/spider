/* eslint-disable node/prefer-global/process */
/* eslint-disable no-console */
import axios from 'axios'
import CtfPrice, { ctfPriceSchema } from './schema/ctf.schema'

interface CtfPriceReturn {
  ID: number
  InputTime: string
  TodayDate: string
  TodayPriceRMB: number
  TodayPriceHK: number
  Commision: number
  PriceType: number
  IsCommision: boolean
  AdminID: number
  TodayPriceTzjt: number
  TodayPriceQzj: number
  TodayPriceHgj_Shi: number
  TodayPriceHgj_Gong: number
  BaiJianHJPrice: number
  TouZiHJPrice: number
  TouziZuboPrice: number
  TouziZuboHJPrice: number
}

async function requestPrice(): Promise<CtfPriceReturn | null> {
  const timestamp = new Date().getTime()
  return new Promise((resolve) => {
    axios.get(
      `https://api.ctfmall.com/wxmini/CTFMALL_Common_API.ashx?action=gettodayprice`,
      {
        data: JSON.stringify({ timestamp }),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then((res) => {
        if (res.data.length > 0) {
          resolve(res.data[0])
        }
        else {
          resolve(null)
        }
      })
  })
}

async function main(): Promise<any> {
  const data = await requestPrice()
  if (!data) {
    console.error('No data')
    return
  }
  const isExist = await CtfPrice.findOne({ inputTime: data.InputTime })
  if (isExist) {
    console.log('已存在')
    process.exit(0)
  }

  const r = await new CtfPrice({
    todayPriceHK: data.TodayPriceHK,
    todayPriceRMB: data.TodayPriceRMB,
    todayPriceTzjt: data.TodayPriceTzjt,
    touziZuboPrice: data.TouziZuboPrice,
    baiJianHJPrice: data.BaiJianHJPrice,
    touziZuboHJPrice: data.TouziZuboHJPrice,
    inputTime: data.InputTime,
  }).save()

  console.log(r)
  process.exit(0)
  return r
}

main()
