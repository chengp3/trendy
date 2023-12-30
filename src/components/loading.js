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
            <motion.div key={1} variants={item} className=''>Calling Lambda to request data...</motion.div>
            <motion.div key={2} variants={item} className='mt-7'>Attempting download from Yahoo! Finance...</motion.div>
            <motion.div key={3} variants={item} className='mt-7'>First spin-up takes about 20 seconds...</motion.div>
            <motion.div key={4} variants={item} className='mt-7'>But this is longer than usual... 😬</motion.div>
          </motion.div>
        </div>
      </div>
    )
  }
  else {
    return (
      <motion.div key={0} className='h-full w-full flex flex-col justify-center items-center' initial={{opacity: 0}} animate={{opacity: 1}}>
        <p>Request time out 😭</p> 
        <p>You can try again by refreshing or selecting another instrument!</p>
      </motion.div>
    )
  }

  
}

export default Loading;