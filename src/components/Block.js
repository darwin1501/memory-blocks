import React ,{ memo} from "react";
import BlockStyle from './BlockStyle.module.css'

export default memo(function Block(props) {
    return (
        <button className={BlockStyle.block} value={props.value} onClick={props.blockClick}>
        </button>
    )
})