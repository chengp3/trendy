import React from 'react'
import TrendStatement from './trendStatement'

export default function ChartTitle ({ticker, trend}) {
    return (<div className='mb-8 w-full flex justify-between items-center font-sans'>
    <TrendStatement trend={trend} className='flex-grow text-center' />
  </div>)
}