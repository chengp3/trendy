import Chart from './chart'
import trendlines from '../components/trend'
import TrendStatement from '../components/trendStatement'
import axios from 'axios'
import React, {useEffect, useState} from 'react'

async function fd(ticker) {
  try {
    const endpoint = process.env.NEXT_PUBLIC_ep + 'i=' + ticker; // Replace with your actual API endpoint.
    const response = await axios.get(endpoint);

    let data = JSON.parse(response.data.body)

    data = data.map(item => ({
      time: item['Datetime'] / 1000,
      open: item['Open'],
      high: item['High'],
      low: item['Low'],
      close: item['Close']
    }));

    return data;

  } catch (error) {
    if (error.response && error.response.status === 502) {
          console.error('Gateway error: likely throttled or Yfinance down');
      } else {
          console.error('Error fetching data:', error);
      }
  }
}

export default function ChartAndTrend ({loading, setLoading, ticker}) {
    const [data, setData] = useState(null);
    const [uplines, setUplines] = useState(null);
    const [sidelines, setSidelines] = useState(null);
    const [downlines, setDownlines] = useState(null);
    const [trend, setTrend] = useState(null);


    useEffect(() => {
      async function fetchData() {
          try {
              let fetchedData = await fd(ticker);
              setData(fetchedData);
              const trendData = trendlines(fetchedData);
              setUplines(trendData.uplines);
              setSidelines(trendData.sidelines);
              setDownlines(trendData.downlines);
              setTrend(trendData.trend);       
              setLoading(false);      
              setTimeout(() => {
                document.getElementById('trendStatement').style.opacity='1';
              }, 500);
              
          } catch (error) {
              console.error("Failed to fetch data", error);
          }
      }
      
      fetchData();
    }, [ticker])


    return (
      <div className='h-full w-full flex flex-col items-center drop-shadow-xl p-8'>
        <TrendStatement trend={trend} />
        <div className='flex-grow w-full h-full flex justify-center items-center'><Chart data={data} loading={loading} uplines={uplines} sidelines={sidelines} downlines={downlines} className='flex-grow' /></div>
      </div>)
}


  
