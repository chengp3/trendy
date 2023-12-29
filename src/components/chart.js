"use client"

import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import {motion as m} from 'framer-motion'

export default function Chart ({ data, uplines, sidelines, downlines}) {
    
    const chartRef = useRef(null);
    const containerRef = useRef(null);    

    useEffect(() => {
        if (!containerRef.current) return;
        const chart = createChart(containerRef.current, { 
            autoSize: true,
            timeScale: {
                timeVisible: true
            }
        });
        chartRef.current = chart;

        const candlestickSeries = chart.addCandlestickSeries();
        candlestickSeries.setData(data);

        //console.log(data[data.length - 1])

        const drawLines = (lineset, color) => {
            lineset.forEach(line => {
                if (line[0]['time'] === line[1]['time']) return;
                const lineSeries = chart.addLineSeries({
                    lastValueVisible: false,
                    priceLineVisible: false,
                    color: color,
                    lineWidth: 2,
                });
                lineSeries.setData(line);
            });
        }
        
        drawLines(uplines, 'lightgreen');
        drawLines(sidelines, 'darkgray');
        drawLines(downlines, 'red');

        return () => {
            chart.remove();
        };
    }, [data, uplines, sidelines, downlines]);

    return (<m.div initial={{opacity:0, scale: 0.95}} animate={{opacity:1, scale: 1}} transition={{duration:.5, ease:'easeOut'}} 
        ref={containerRef} className='h-full w-full flex-grow'></m.div>)
}

