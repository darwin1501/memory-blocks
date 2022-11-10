import React ,{ memo} from "react";
import BlockStyle from './BlockStyle.module.css'

export default memo(function Block(props) {
    const {value, activePattern, pattern} = props
    
    /**
     * if pattern 
     */

    return (
        <button className={BlockStyle.block} 
                value={props.value} 
                onClick={props.blockClick}
                style={{ backgroundColor: props.backgroundColor}}
        >
        
        </button>
    )
})