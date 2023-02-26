import React, { createContext } from 'react'
import useCreateData from '../../features/customHooks/useCreateData';
import ErrorList from '../ErrorList'

export const SaveSuccessContext = createContext();

const SaveSuccess = ({children}) => {

    const [{data: saveSuccess, error: saveError}, saveSolution, resetSave] = useCreateData({url:"/api/schedule/save-solution"});

    const errors = [saveError].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

  return (
    <>
        <SaveSuccessContext.Provider value={{saveSuccess, saveSolution, resetSave}}>
            {children}
        </SaveSuccessContext.Provider>

        { saveSuccess && <p>{saveSuccess}</p> }
    </>
  )
}

export default SaveSuccess