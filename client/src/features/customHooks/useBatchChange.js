import { useDispatch } from "react-redux";
import { useState } from "react";
import { checkForError } from "../utils/checkForError";

const useBatchChange = ({url}) => {

    const reduxDispatch = useDispatch();

    const [batchError, setBatchError] = useState(null);

    const batchChange = (items)=>{

            items?.forEach(async (item)=>{

                try{
                    const response = await fetch(
                        url instanceof Function ? url(item) : url,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type":"application/json",
                            },
                            body: JSON.stringify(item)
                        }
                    )

                    await checkForError(response, reduxDispatch);

                    // await response.json(); // There is no need to use data from response

                } catch (error) {
                    setBatchError(error);
                }
            });
    }

    return [batchError, batchChange];
}

export default useBatchChange