import React from 'react'
import style from '../styles/tables.module.css'

const Tables = ({tables, captions, headers, rows, cells}) => {
  // tables - array of table keys
  // captions, headers, rows - functions that return arrays of values for a given table key
  // cells - function that returns a value for a given table key, row key and column key

  const spanIfArray = (item) => {
    if(Array.isArray(item))
      return item.map((val, indx)=><span key={indx}>{val}</span>)
    return item
  }

  return (
    <>
    { tables.map((table)=>(
      <div key={table} className={style.responsivetable}>
        <table>
          <caption>{captions(table)}</caption>
          <thead>
            <tr>
              {headers(table).map((header)=>(<th key={header}>{header}</th>))}
            </tr>
          </thead>
          <tbody>
          {rows(table).map((row)=>(
            <tr key={row}>
              {headers(table).map((header)=>(
                <td key={header}>{spanIfArray(cells(table, row, header))}</td>
              ))}
            </tr>
          ) )}
          </tbody>
        </table>
      </div>
    ))}
  </>
  )
}

export default Tables