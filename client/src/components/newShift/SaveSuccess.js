import React, { createContext, useContext, useEffect } from 'react'
import useCreateData from '../../features/customHooks/useCreateData';
import ErrorList from '../ErrorList/ErrorList';
import { DateContext } from './ChooseDate';
import { GroupIdContext } from './ChooseGroup';

export const SaveSuccessContext = createContext();

const SaveSuccess = ({children}) => {

  const date = useContext(DateContext);
  const groupId = useContext(GroupIdContext);

    const [{data: saveSuccess, error: saveError}, saveSolution, resetSave] = useCreateData({url:"/api/schedule/save-solution"});

    useEffect(() => {
      resetSave(); // Show new schedule form if date or group changed
    }, [date, groupId, resetSave]);

    const errors = [saveError].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }
    
  return (
    <>
      { saveSuccess ? <p>{saveSuccess}</p> :
        <SaveSuccessContext.Provider value={{saveSolution}}>
            {children}
        </SaveSuccessContext.Provider>
      }
    </>
  )
}

export default SaveSuccess