import React from 'react'

const GroupDataBasic = ({group, spanTag}) => {

    const data = {
        'Nazwa': group?.group_name,
        'Liczba zmian': group?.num_of_shifts,
        'Ostatnia zmiana': group?.updated,
    }

  return (
    <>
        {Object.keys(data).map((key)=>(
            spanTag ? <span key={key}>&nbsp;{data[key]}&nbsp;</span> : <p key={key}>{key}: {data[key]}</p>
        ))}
    </>
  )
}

export default GroupDataBasic