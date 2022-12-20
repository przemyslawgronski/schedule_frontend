import { useDispatch } from 'react-redux';
import { logout } from "../user";
import { useEffect, useReducer, useCallback } from "react";

//Fettch data from django backend
// url - url to be fetched
// test - optional, if boolean value is true then return data, otherwise false
// modify - optional, modify returned data

const ACTION = {
  FETCH_DATA: "FETCH_DATA",
  CHANGE_DATA: "CHANGE_DATA",
  FETCH_ERROR: "FETCH_ERROR",
};

const initialState = {
  data: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.FETCH_DATA:
      return {
        ...state,
        data: action.payload.modify ? action.payload.modify(action.payload.data) : action.payload.data,
      };
    case ACTION.CHANGE_DATA:
      return {
        ...state,
        data: action.payload.modify ? action.payload.modify(action.payload.data) : action.payload.data,
      };
    case ACTION.FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useGetAndChange = ({ url, test, modify }) => {
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, initialState);



  const getData = useCallback(async () => {
    if ((typeof test !== "undefined") && !test) return;

    try {
      const fetchResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!fetchResponse.ok) {
        if (fetchResponse.status === 401) dispatch(logout());
        throw new Error(`Błąd: ${fetchResponse.status} ${fetchResponse.statusText}`);
      }

      // Everything is ok

      const jsonData = await fetchResponse.json();

      dispatchState({
        type: ACTION.FETCH_DATA,
        payload: { data: jsonData, modify: modify },
      });

    } catch (error) {
      dispatchState({ type: ACTION.FETCH_ERROR, payload: error });
    }
  },[dispatch, modify, test, url]);



  const changeData = async (body) => {

    if ((typeof test !== "undefined") && !test) return;

    try {
      const fetchResponse = await fetch(url, {
        method: "PUT",
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

      dispatchState({
        type: ACTION.CHANGE_DATA,
        payload: { data: jsonData, modify: modify },
      });

    } catch (error) {
      dispatchState({ type: ACTION.FETCH_ERROR, payload: error });
    }
  };

  const setData = (argData) => {
    dispatchState({
      type: ACTION.CHANGE_DATA,
      payload: { data: argData, modify: modify },
    });
  };

  // Get data on first render
  useEffect(() => {
    getData();
  }, [getData]);

  return [state, {getData, changeData, setData}];
};

export default useGetAndChange;