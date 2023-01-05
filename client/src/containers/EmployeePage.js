import React from 'react'
import { useParams } from 'react-router-dom'
import EmployeeData from '../components/employee/EmployeeData'
import EmployeeForm from '../components/employee/EmployeeForm'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import ToggleComponents from '../components/ToggleComponents'
import ErrorList from '../components/ErrorList'

const EmployeePage = () => {

    const { id } = useParams();

    const [groupsState] = useGetAndChange({url:"/api/schedule/groups"});
    const [employeeState, {getData: getEmp, changeData:changeEmp, setData: setEmp}] = useGetAndChange({url:`/api/schedule/employees/${id}`})
    
    if(groupsState.error || employeeState.error){
        return <ErrorList errors={[groupsState?.error?.message, employeeState?.error?.message]} />
    }

    return (
        <div>
            <p>Pracownik:</p>
                <ToggleComponents
                    Component1={EmployeeForm} component1Props={{employee:employeeState.data, groups:groupsState.data, changeEmp, setEmp}}
                    Component2={EmployeeData} component2Props={{employee:employeeState.data, groups:groupsState.data, getEmp}}
                />
        </div>
    )
}

export default EmployeePage