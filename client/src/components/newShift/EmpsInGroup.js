import React, { useContext, useCallback, createContext } from 'react'
import useGetAndChange from '../../features/customHooks/useGetAndChange'
import { GroupIdContext } from './ChooseGroup'
import ErrorList from '../ErrorList'

export const EmpsInGroupContext = createContext();

const EmpsInGroup = ({children}) => {

    const groupId = useContext(GroupIdContext);

    const [{data: empsInGroup, error: empsInGroupError}] = useGetAndChange({
        url:`/api/schedule/groups/${groupId}/employees`,
        test: groupId,
        modify:useCallback((arr)=>arr.filter(emp=>!emp.hide), []) // Filter out hidden employees
      });

      const errors = [empsInGroupError].filter(Boolean);

      if (errors.length) {
          return <ErrorList errors={errors.map(({ message }) => message)} />;
      }

  return (
    <>
    { empsInGroup?.length > 0 ?
        <EmpsInGroupContext.Provider value={empsInGroup}>
            {children}
        </EmpsInGroupContext.Provider> :
        <p>Brak pracowników w grupie</p>
    }
    </>
  )
}

export default EmpsInGroup