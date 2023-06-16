import React, { createContext, useEffect } from 'react'
import useCreateData from '../../features/customHooks/useCreateData';
import ErrorList from '../ErrorList'

export const SaveSuccessContext = createContext();

const SaveSuccess = ({children}) => {

    const [{data: saveSuccess, error: saveError}, saveSolution, resetSave] = useCreateData({url:"/api/schedule/save-solution"});

    // Show new schedule form if date or group changed
    useEffect(() => {
      resetSave(); // Is this needed ? 
    }, [resetSave]);

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