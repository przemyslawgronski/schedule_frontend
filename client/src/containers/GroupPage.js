import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GroupDataExtended from '../components/group/GroupDataExtended';
import GroupForm from '../components/group/GroupForm';
import useGetAndChange from '../features/customHooks/useGetAndChange';
import ToggleComponents from '../components/ToggleComponents';
import ErrorList from '../components/ErrorList';
import useRemoveItem from '../features/customHooks/useRemoveItem';


const GroupPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ group, {getData: getGroup, changeData: changeGroup}
    ] = useGetAndChange({url:`/api/schedule/groups/${id}`});
    
    const [ groupEmployees, {getData: getGroupEmployees}
    ] = useGetAndChange({
        url:`/api/schedule/groups/${id}/employees`,
        modify: useCallback((arr=>arr.filter(gr=>!gr.hide)),[]) // Filter out hidden employees
    });

    const [removeError, remove] = useRemoveItem({refreshList: ()=>navigate('/groups')});

    const errors = [removeError, group.error, groupEmployees.error].filter(Boolean);

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
                        remove
                    }}
                    Component2={GroupDataExtended}
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