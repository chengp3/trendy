import React, { useRef, useEffect, useState } from 'react';
import { ChaoticOrbit } from '@uiball/loaders'
import {AnimatePresence, motion} from 'framer-motion'
import {useId} from 'react'

const Loading = () => {
  const [failed, setFailed] = useState(false);

  const container = {
    hide: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 8
      }
    }
  };

  const item = {
    hide: {opacity: 0},
    show: {opacity: 1, 
    transition: {
      duration: .1
    }}
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFailed(true);
    }, 30000); 

    return () => clearTimeout(timer); 
  }, []);

  if (!failed) {
    return (
      <div className='h-full w-full flex flex-row justify-center'>
        <motion.div className='h-full w-1/2 flex-grow flex items-center justify-center'>
          <ChaoticOrbit size={50} color='red' style={{transition: 'opacity .5s'}}/>
        </motion.div>
        <div className='h-full w-1/2 flex flex-col justify-center'>
          <motion.div variants={container} initial="hide" animate="show">
            <motion.div key={1} variants={item} className=''>Spinning up Lambda Function...</motion.div>
            <motion.div key={2} variants={item} className='mt-7'>Requesting data from Yahoo! Finance...</motion.div>
            <motion.div key={3} variants={item} className='mt-7'>First spin-up takes around 20 seconds...</motion.div>
            <motion.div key={4} variants={item} className='mt-7'>But this is longer than usual...</motion.div>
          </motion.div>
        </div>
      </div>
    )
  }
  else {
    return (
      <motion.div key={0} className='mt-5' initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 60}}}>Request time out :(</motion.div>
    )
  }

  
}

export default Loading;