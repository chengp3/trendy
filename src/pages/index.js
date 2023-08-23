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
        <h1 style={{color: '#413F3D'}} className='m-12 text-5xl font-bold italic font-serif drop-shadow-xl'>trendy</h1>
        <ChartAndTrend loading={loading} setLoading={setLoading} ticker={ticker} />
        <NavBar selectedTickers={selectedTickers} currentTicker={ticker} setCurrentTicker={setTicker} setLoading={setLoading} />
      </m.div>
    </main>
  )
}