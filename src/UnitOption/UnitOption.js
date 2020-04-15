import React from 'react'
import style from './UnitOption.module.css'

const unitOption =(props)=>{
    return(
        <div>
        <span className={style.Label}> Unit: </span>
     
            <select className={style.Select} onChange={props.confirmChangeUnit} value={props.curUnit}>
                      <option value="si">Celsius</option>
                      <option value="us">Fahrenheit</option>
            </select>
            
  
        </div>
    )
}

export default unitOption