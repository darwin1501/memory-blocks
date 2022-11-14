import React ,{ memo, useState} from "react";
import BlockStyle from './BlockStyle.module.css'

export default memo(function Block(props) {
    const {value, backgroundColor, blockClick, isShowingPattern} = props

    // if showing pattern stops
    // remove white background
    return (
        <button className={BlockStyle.block} 
                value={value} 
                onClick={blockClick}
                style={{ backgroundColor: !isShowingPattern ? "#24AE9F" : backgroundColor}}
                disabled = {isShowingPattern}
        >
        </button>
    )
})