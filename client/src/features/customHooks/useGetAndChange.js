import { useDispatch } from 'react-redux';
import { useEffect, useReducer, useCallback } from "react";
import { checkForError } from "../utils/checkForError";

//Fettch data from django backend
// url - url to be fetched
// modify - optional, modify returned data

const ACTION = {
  FETCH_DATA: "FETCH_DATA",
  CHANGE_DATA: "CHANGE_DATA",
  FETCH_ERROR: "FETCH_ERROR",
  RESET: "RESET",
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
    case ACTION.RESET:
      return initialState;
    default:
      return state;
  }
};

const useGetAndChange = ({ url, modify }) => {
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, initialState);

  const getData = useCallback(async () => {

    try {
      // Reset state to avoid showing old (wrong) data
      dispatchState({ type: ACTION.RESET });

      const fetchResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await checkForError(fetchResponse, dispatch);

      // Everything is ok

      const jsonData = await fetchResponse.json();

      dispatchState({
        type: ACTION.FETCH_DATA,
        payload: { data: jsonData, modify: modify },
      });

    } catch (error) {
      dispatchState({ type: ACTION.FETCH_ERROR, payload: error });
    }
  },[dispatch, modify, url]);



  const setData = (argData) => {
    dispatchState({
      type: ACTION.CHANGE_DATA,
      payload: { data: argData, modify: modify },
    });
  };



  const changeData = async (body) => {

    try {
      const fetchResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      await checkForError(fetchResponse, dispatch);

      // Everything is ok

      const jsonData = await fetchResponse.json();

      setData(jsonData);
      
    } catch (error) {
      dispatchState({ type: ACTION.FETCH_ERROR, payload: error });
    }
  };


  // Get data on first render
  useEffect(() => {
    getData();
  }, [getData]);

  
  return [state, {getData, changeData, setData}];
};

export default useGetAndChange;