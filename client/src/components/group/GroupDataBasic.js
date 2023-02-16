import React from 'react'
import DisplayObject from '../DisplayObject'

const GroupDataBasic = ({group, spanTag}) => {

    const data = {
        'Nazwa': group?.group_name,
        'Liczba zmian': group?.num_of_shifts,
        'Ostatnia zmiana': group?.updated,
        'Ukryty': group?.hide ? 'tak' : 'nie'
    }

  return (
    <DisplayObject object={data} spanTag={spanTag}/>
  )
}

export default GroupDataBasic