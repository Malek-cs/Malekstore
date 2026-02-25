/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState,useRef,useEffect } from "react"


export default function ImageBanner() {

    const [isLoaded,setisLoaded]=useState(false)
    const imgRef=useRef()

    useEffect(()=>{
        if(imgRef.current.complete){
            setisLoaded(true)
        }
    },[])

    return(
        <div className="banner-images">
            <img className="low-res-img" src="low_res/candle.jpg" 
            alt="Candles-low-res"/>
            <img ref={imgRef} className="high-res-img" 
            src="med_res/candle.jpg" 
            alt="candle-high-res"style={{opacity: isLoaded ? 1 : 0}} onLoad={()=>{

                setisLoaded(true)
            }}/>
            <div className="cta-btns-container">
                <div >
                    <div >
                        <h3>Welcome to</h3>
                        <h1>Haya Store</h1>
                    </div>
                    <div>
                        <button>Shop Candles</button>
                        <button>Shop Decor Candles</button>
                    </div>
                </div>
            </div>
        </div>
    )
    
}