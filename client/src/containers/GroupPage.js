import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GroupDataExtended from '../components/group/GroupDataExtended';
import GroupForm from '../components/group/GroupForm/GroupForm';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ToggleComponents from '../components/ToggleComponents';
import ErrorList from '../components/ErrorList/ErrorList';


const GroupPage = () => {

    const { id } = useParams();

    const [ group, {changeData: changeGroup} ] = useGetAndChange({url:`/api/schedule/groups/${id}`});
    
    const [groupEmployees] = useGetAndChange({
        url:`/api/schedule/groups/${id}/employees`,
        modify: useCallback((arr=>arr.filter(gr=>!gr.hide)),[]) // Filter out hidden employees
    });

    const [constraints] = useGetAndChange({url:"/api/schedule/constraints"});

    const errors = [group.error, groupEmployees.error, constraints.error].filter(Boolean);

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
                        submitFunc: changeGroup,
                        constraints: constraints.data,
                    }}
                    Component2={GroupDataExtended}
                    component2Props={{
                        groupEmployees: groupEmployees.data,
                        group: group.data,
                        constraints: constraints.data
                    }}
                />
            </div>
    )
}

export default GroupPage