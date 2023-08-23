import ChartAndTrend from '../components/chartAndTrend'
import React, {useState} from 'react'
import { selectedTickers } from '../../tickers'
import NavBar from '../components/navBar'
import {motion as m} from 'framer-motion'

export default function Home() {
  const [ticker, setTicker] = useState(selectedTickers[0]);
  const [loading, setLoading] = useState(true);

  return (
    <main
      className={`flex h-screen flex-col items-center justify-center text-black`}>
      <m.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration:1, ease:'easeOut'}} className='p-8 w-10/12 max-w-4xl h-full flex items-center justify-center flex-col'>
        <div className='flex items-center justify-center'>
          <h1 style={{color: '#413F3D'}} className='my-12 mx-1 text-5xl font-bold italic font-serif drop-shadow-xl'>trendy</h1>
          <div className="tooltip-container">
            <img id="excl" src='/excl.svg' className='h-8' />
            <span className='tooltip-text italic font-serif'>the chart is interactive :)</span>
          </div>
        </div>
        <ChartAndTrend loading={loading} setLoading={setLoading} ticker={ticker} />
        <NavBar selectedTickers={selectedTickers} currentTicker={ticker} setCurrentTicker={setTicker} setLoading={setLoading} />
      </m.div>
    </main>
  )
}