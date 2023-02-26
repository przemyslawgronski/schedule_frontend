import React, { createContext } from 'react'
import useCreateData from '../../features/customHooks/useCreateData';
import ErrorList from '../ErrorList'

export const SolutionContext = createContext();

const GetSolution = ({children}) => {

    const [{data: solution, error: solutionError}, createSolution] = useCreateData({url:"/api/schedule/render-solution"});

    const errors = [solutionError].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

  return (
    <SolutionContext.Provider value={{solution, createSolution}}>
        {children}
    </SolutionContext.Provider>
  )
}

export default GetSolution