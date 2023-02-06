import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeData from '../components/employee/EmployeeData'
import EmployeeForm from '../components/employee/EmployeeForm'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import ToggleComponents from '../components/ToggleComponents'
import ErrorList from '../components/ErrorList'
import useRemoveItem from '../features/customHooks/useRemoveItem'

const EmployeePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [groupsState] = useGetAndChange({url:"/api/schedule/groups"});
    const [employeeState, {getData: getEmp, changeData:changeEmp}] = useGetAndChange({url:`/api/schedule/employees/${id}`});
    const [removeError, remove] = useRemoveItem({refreshList: () => navigate('/employees')});

    const errors = [removeError, groupsState.error, employeeState.error].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

    return (
        <div>
            <p>Pracownik:</p>
                <ToggleComponents
                    Component1={EmployeeForm} component1Props={{employee:employeeState.data, groups:groupsState.data, changeEmp, remove}}
                    Component2={EmployeeData} component2Props={{employee:employeeState.data, groups:groupsState.data, getEmp}}
                />
        </div>
    )
}

export default EmployeePage