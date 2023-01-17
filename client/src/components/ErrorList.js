// React component that renders unordered list of items otherwise renders children

import React from 'react'

const ErrorList = ({errors}) => {
    // filter out undefined and null values
    errors = errors.filter(err => err !== undefined && err !== null);

    return (
        <>
            <p>Wystąpił Błąd:</p>
            <ul>
                {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
            <button onClick={() => window.location.reload()}>Odśwież stronę</button>
        </>
    )
}

export default ErrorList