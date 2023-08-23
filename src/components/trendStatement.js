import React from 'react';

export default function TrendStatement ({ trend }) {
    let img
    if (trend === 'Up') img = '/up.png'
    else if (trend === 'Down') img = '/down.png'
    else if (trend === 'Sideways up' || trend === 'Sideways down') img = '/sideways.png'
    
    return (
        <div id='trendStatement' style={{opacity: 0, transition: 'opacity 0.5s ease'}} className='w-full flex flex-grow justify-center mb-8 items-center'>
            <div style={{color: '#697184'}} className='text-xl pr-3 font-serif italic'>The trend is {trend ? `"${trend}"` : '...'}</div>
            <img src={img} style={{opacity: .6}} className='h-5 translate-y-.5 -translate-x-1' />
        </div>
    )
}