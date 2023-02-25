import React, { useCallback, useEffect } from 'react'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import ErrorList from '../ErrorList'
import DropDown from '../form/DropDown'

const ChooseGroup = ({setGroupId}) => {

    const [{data: groups, error: groupsErrors}] = useGetAndChange({
        url:"/api/schedule/groups",
        modify:useCallback((arr)=>arr.filter(gr=>!gr.hide), []) // Filter out hidden groups
      });

    useEffect(()=>{ // First render - set default chosen group to groups[0]
        if (groups && groups[0] != null) setGroupId( groups[0].id );
    }, [groups, setGroupId])

    const errors = [groupsErrors].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

  return (
    <DropDown label="Wybierz grupę" name="groupId" options={groups} valueKey="id"
    objKey="id" objText="group_name" onChangeFunc={(event)=>setGroupId(JSON.parse(event.target.value))}/>
  )
}

export default ChooseGroup