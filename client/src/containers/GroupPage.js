import React from 'react';
import { useParams } from 'react-router-dom';
import GroupData from '../components/group/GroupData';
import GroupForm from '../components/group/GroupForm';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ToggleComponents from '../components/ToggleComponents';
import ErrorList from '../components/ErrorList';
import useBatchChange from '../features/customHooks/useBatchChange';

const GroupPage = () => {

    const { id } = useParams();

    const [
        group,
        {setData: setGroup, getData: getGroup, changeData: changeGroup}
    ] = useGetAndChange({url:`/api/schedule/groups/${id}`});
    
    const [
        groupEmployees,
        {setData: setGroupEmployees, getData: getGroupEmployees}
    ] = useGetAndChange({url:`/api/schedule/groups/${id}/employees`});
    
    const [batchError, batchChange] = useBatchChange({url: (emp)=>`/api/schedule/employees/${emp.id}`})
    
    const [
        allEmployees,
        {setData: setAllEmployees, getData: getAllEmployees}
    ] = useGetAndChange({url: '/api/schedule/employees'});


    const errors = [group.error, groupEmployees.error, batchError, allEmployees.error].filter(Boolean);

    if (errors.length) {
        return <ErrorList errors={errors.map(({ message }) => message)} />;
    }

    return (
            <div>
                <p>Grupa:</p>

                <ToggleComponents
                    Component1={GroupForm}
                    component1Props={{
                        group: group.data,
                        setGroup,
                        changeGroup,
                        batchChange,
                        setGroupEmployees,
                        allEmployees,
                        setAllEmployees,
                        getAllEmployees
                    }}
                    Component2={GroupData}
                    component2Props={{
                        groupEmployees: groupEmployees.data,
                        getGroupEmployees,
                        group: group.data,
                        getGroup
                    }}
                />
            </div>
    )
}

export default GroupPage