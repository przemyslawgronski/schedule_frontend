import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../user";

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

                    if (!response.ok) {
                        if (response.status === 401) reduxDispatch(logout());
                        throw new Error(`Błąd: ${response.status} ${response.statusText}`);
                    }

                    // await response.json(); // There is no need to use data from response

                } catch (error) {
                    setBatchError(error);
                }
            });
    }

    return [batchError, batchChange];
}

export default useBatchChange