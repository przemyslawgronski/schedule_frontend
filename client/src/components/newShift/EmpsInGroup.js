import React, { useContext, useCallback, createContext } from 'react'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import { GroupIdContext } from './ChooseGroup'
import ErrorList from '../ErrorList/ErrorList'

export const EmpsInGroupContext = createContext();

const EmpsInGroup = ({children}) => {

    const groupId = useContext(GroupIdContext);

    const [{data: empsInGroup, error: empsInGroupError}] = useGetAndChange({
        url:`/api/schedule/groups/${groupId}/employees`,
        test: groupId,
        modify:useCallback((arr)=>arr.filter(emp=>!emp.hide), []) // Filter out hidden employees
      });

      const errors = [empsInGroupError].filter(Boolean);

  if (errors.length) return <ErrorList errors={errors.map(({ message }) => message)} />;
  else if (empsInGroup === null) return <p>Ładowanie...</p>;
  else if (empsInGroup.length === 0) return <p>Brak pracowników w grupie</p>;

  return (
        <EmpsInGroupContext.Provider value={empsInGroup}>
            {children}
        </EmpsInGroupContext.Provider>
  )
}

export default EmpsInGroup