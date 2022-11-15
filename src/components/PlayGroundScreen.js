import React from "react";

export default function PlayGroundScreen(props){
    return(
        <div className="main-screen">
         <div className='title-container'>
           {
             props.isGameStarted ?
             <h1>Level: {props.level -1}</h1>
             :
             <>
               <h1 className='m-0 title'>Memory Blocks</h1>
               <p className='m-0 sub-title'>How much pattern you can memorize?</p>
             </>
           }
         </div>
         <div className='flex flex-center'>
           <div className='blocks-container'>
             {props.blocks}
           </div>
         </div>
         <div className='flex flex-center'>
           <div className='btn-play-container'>
             {
             !props.isGameStarted &&  
               <button className='btn-play' onClick={props.play}>
                 Play
               </button>
             }
           </div>
         </div>
       </div>
    )
}