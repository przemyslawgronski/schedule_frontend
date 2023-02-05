import React from 'react'

const Tables = ({tables, captions, headers, rows, cells}) => {
  // tables - array of table keys
  // captions, headers, rows - functions that return arrays of values for a given table key
  // cells - function that returns a value for a given table key, row key and column key

  // console.log({tables});
  // console.log('headers')
  // console.log(tables.map((table)=>headers(table)));
  // console.log('rows')
  // console.log(tables.map((table)=>rows(table)));
  // console.log('cells')
  // console.log(tables.map((table)=>rows(table).map((row)=>headers(table).map((header)=>cells(table, row, header)))));

  return (
    <>
    { tables.map((table)=>(
      <table key={table}>
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
              <td key={header}>{cells(table, row, header)}</td>
            ))}
          </tr>
        ) )}
        </tbody>
      </table>
    ))}
  </>
  )
}

// Object.keys(mangledShifts[grID])

export default Tables