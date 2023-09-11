import React from 'react'
import DisplayObject from '../DisplayObject'

const GroupDataBasic = ({group, spanTag, constraints}) => {

    const data = {
        'Nazwa': group?.group_name,
        'Liczba zmian': group?.num_of_shifts,
        'Ostatnia zmiana': group?.updated && new Date(group.updated).toLocaleString(),
        'Ukryty': group?.hide ? 'tak' : 'nie',
        'Ograniczenia': constraints?.find((constraint)=>constraint.id===group?.constraints)?.representation,
    }

  return (
    <DisplayObject object={data} spanTag={spanTag}/>
  )
}

export default GroupDataBasic