import React from 'react'
import style from './UnitOption.module.css'

const unitOption =(props)=>{
    return(
        <div>
        <span className={style.Label}> Unit: </span>
            <select className={style.Select} onChange={props.unitChange} value={props.curUnit}>
                      <option value="metric">Celsius</option>
                      <option value="imperial">Fahrenheit</option>
            </select>

        </div>
    )
}

export default unitOption