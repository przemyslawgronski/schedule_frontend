import { useCallback, useReducer } from "react"
import { useDispatch } from "react-redux";
import { logout } from "../user";

const ACTION = {
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
};

const initialState = {
    data: null,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        case ACTION.FETCH_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ACTION.FETCH_RESET:
            return initialState;
        default:
            return state;
    }
};

const useCreateData = ({ url, refresh }) => {
    const dispatch = useDispatch();
    const [state, dispatchState] = useReducer(reducer, initialState);

    const createData = async (body) => {
        try {
            const fetchResponse = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
    
            if (!fetchResponse.ok) {
                if (fetchResponse.status === 401) dispatch(logout());
                throw new Error(`Błąd: ${fetchResponse.status} ${fetchResponse.statusText}`);
            }
        
            // Everything is ok

            const jsonData = await fetchResponse.json();
            dispatchState({ type: ACTION.FETCH_SUCCESS, payload: jsonData });
            refresh?.();

        } catch (error) {
            dispatchState({ type: ACTION.FETCH_ERROR, payload: error });
        }
    };

    const reset = useCallback(() => {
        dispatchState({ type: ACTION.FETCH_RESET });
    },[]);

    return [state, createData, reset];
};

export default useCreateData;