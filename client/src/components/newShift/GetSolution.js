import React, { createContext, useContext, useEffect } from 'react'
import useCreateData from '../../features/customHooks/useCreateData';
import ErrorList from '../ErrorList/ErrorList'
import { DateContext } from './ChooseDate';
import { GroupIdContext } from './ChooseGroup';

export const SolutionContext = createContext();

const GetSolution = ({children}) => {

    const date = useContext(DateContext);
    const groupId = useContext(GroupIdContext);

    const [{data: solution, error: solutionError}, createSolution, resetSolution] = useCreateData({url:"/api/schedule/render-solution"});

    useEffect(() => {
      resetSolution(); // Reset solution if date or group changed
    }, [date, groupId, resetSolution]);

    const errors = [solutionError].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

  return (
    <SolutionContext.Provider value={{solution, createSolution, resetSolution}}>
        {children}
    </SolutionContext.Provider>
  )
}

export default GetSolution