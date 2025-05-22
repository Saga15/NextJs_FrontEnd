import React, { useEffect, useState } from 'react'
import DemoChart from '../components/charts/waterFall'
import { waterFallChartData } from '../utils/constants'
import { candlestickChartData } from '../utils/constants'
import StockWithAreaChart from '../components/charts/stockWithArea'
import CandlestickChart from '../components/charts/candleStick'
import { get } from '../helper/ApiHook'

const Demo = () => {

  const [candleStickData,setCandleStickData] = useState([])

  const getCandleChartData =async ()=>{
  
// const resoponse = await get('')

const dataPoints = [
  { x: new Date("2017-01-01"), y: [36.61, 38.45, 36.19, 36.82] },
  { x: new Date("2017-02-01"), y: [36.82, 36.95, 34.84, 36.20] },
  { x: new Date("2017-03-01"), y: [35.85, 36.30, 34.66, 36.07] },
  { x: new Date("2017-04-01"), y: [36.19, 37.50, 35.21, 36.15] },
  { x: new Date("2017-05-01"), y: [36.11, 37.17, 35.02, 36.11] },
  { x: new Date("2017-06-01"), y: [36.12, 36.57, 33.34, 33.74] },
  { x: new Date("2017-07-01"), y: [33.51, 35.86, 33.23, 35.47] },
  { x: new Date("2017-08-01"), y: [35.66, 36.70, 34.38, 35.07] },
  { x: new Date("2017-09-01"), y: [35.24, 38.15, 34.93, 38.08] },
  { x: new Date("2017-10-01"), y: [38.12, 45.80, 38.08, 45.49] },
  { x: new Date("2017-11-01"), y: [45.97, 47.30, 43.77, 44.84] },
  { x: new Date("2017-12-01"), y: [44.73, 47.64, 42.67, 46.16] },
];
setCandleStickData(dataPoints)}

useEffect(()=>{
  getCandleChartData()
},[])

  return (
    <div>
        <DemoChart data={waterFallChartData}/>
        <StockWithAreaChart />
        <CandlestickChart data={candleStickData} />
    </div>
  )     
}
export default Demo