import React, { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EmployeeData from '../components/employee/EmployeeData'
import EmployeeForm from '../components/employee/EmployeeForm/EmployeeForm'
import useGetAndChange from '../features/customHooks/useGetAndChange'
import ToggleComponents from '../components/ToggleComponents'
import ErrorList from '../components/ErrorList/ErrorList'
import { addOrRemove } from '../features/utils/arrayUtils'

const EmployeePage = () => {

    const { id } = useParams();

    const [groupsState] = useGetAndChange({
        url:"/api/schedule/groups",
        modify: useCallback((arr)=>arr.filter(gr=>!gr.hide),[]) // filter out hidden groups
    });
    const [employeeState, {changeData:changeEmp}] = useGetAndChange({url:`/api/schedule/employees/${id}`});

    // Keep track of checked groups
    const [empsGroups, setEmpsGroups] = useState([]);
    const addRemoveGroup = (groupID)=>setEmpsGroups((prev)=>addOrRemove(prev, groupID));

    useEffect(() => {
        if (employeeState.data) setEmpsGroups([...employeeState.data.groups]);
    }, [employeeState.data]);

    const errors = [groupsState.error, employeeState.error].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

    return (
        <div>
            <p>Pracownik:</p>
                <ToggleComponents
                    Component1={EmployeeForm}
                    component1Props={{
                        allgroups: groupsState.data,
                        submitFunc: changeEmp,
                        checkedGroups: empsGroups,
                        onChangeGroup: addRemoveGroup,
                        employee: employeeState.data,
                    }}
                    Component2={EmployeeData}
                    component2Props={{
                        employee: employeeState.data,
                        groups: groupsState.data,
                    }}
                />
        </div>
    )
}

export default EmployeePage