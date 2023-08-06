import React, { useCallback, useEffect, useState, createContext } from 'react'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import ErrorList from '../ErrorList/ErrorList'
import DropDown from '../form/DropDown'

export const GroupIdContext = createContext();

const ChooseGroup = ({children}) => {

    const [{data: groups, error: groupsErr}] = useGetAndChange({
        url:"/api/schedule/groups",
        modify:useCallback((arr)=>arr.filter(gr=>!gr.hide), []) // Filter out hidden groups
      });

    const [groupId, setGroupId] = useState(null);

    useEffect(()=>{ // First render - set default chosen group to groups[0]
        if (groups && groups[0] != null) setGroupId( groups[0].id );
    }, [groups, setGroupId])

    if(groupsErr) return <ErrorList errors={[groupsErr.message]} />;

    if(!Array.isArray(groups)) return <div><p>Ładowanie...</p></div>;

    if (groups.length === 0) return <div><p>Brak grup</p></div>;

    if (groupId == null) return <div><p>Ładowanie...</p></div>;

  return (
    <div>
      <DropDown label="Wybierz grupę" name="groupId" options={groups} valueKey="id"
      objKey="id" objText="group_name" onChangeFunc={(event)=>setGroupId(JSON.parse(event.target.value))}/>

      <GroupIdContext.Provider value={groupId}>
          {children}
      </GroupIdContext.Provider>
    </div>
  )
}

export default ChooseGroup